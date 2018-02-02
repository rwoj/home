import rethinkdbdash from "rethinkdbdash"
import modbus from "jsmodbus"
// import ieee754 from "ieee754"
import config from "../config/config"
import {readIEEE754LEW, writeIEEE754LEW} from './helpers'

const client = modbus.client.tcp.complete(config.modbus).connect()
const r = rethinkdbdash(config.db)

async function getKonfig(){
  const konfig = await r.table('konfig').orderBy('id').run()
  const konfigTemp = await r.table('konfigTemp').orderBy('id').run()
  return {konfig, konfigTemp}
}    


async function sprawdzZmianyAndUpdate(rejestr){
  const resp=await client.readHoldingRegisters(rejestr.adres, rejestr.howMany)
  for(let i = 0; i< resp.register.length; i+=1){
    if (rejestr.rej_last[i]!==resp.register[i]) {
      r.table(rejestr.table).get(rejestr.adres+i).update({value: resp.register[i]}).run()
      console.log(`zmiana ${rejestr.adres+i}: ${resp.register[i]}`)
    }
  }
  return resp.register
}
async function sprawdzZmianyAndUpdateTemp(rejestr){
  const resp=await client.readHoldingRegisters(rejestr.adres, rejestr.howMany*2)
  return resp.payload
}
function updateTemp(temperatures, rejestr){
  // let result=[]
  let j=0
  for(let i = 0; i< temperatures.length; i+=1){
    if (temperatures[i]!==rejestr.rej_last1[i] 
      && temperatures[i]!==rejestr.rej_last2[i]
      && temperatures[i]!==rejestr.rej_last3[i]) {
        r.table(rejestr.table).get(rejestr.adres+j).update({value: temperatures[i]}).run()
        // console.log(`zmiana ${rejestr.adres+j}: ${temperatures[i]} : ${rejestr.rej_last1[i]} : ${rejestr.rej_last2[i]} : ${rejestr.rej_last3[i]}`)
      } 
      j+=2
  }
}
function updateTempNast(temperatures, rejestr){
  // let result=[]
  let j=0
  for(let i = 0; i< temperatures.length; i+=1){
    if (temperatures[i]!==rejestr.rej_last1[i]) {
        r.table(rejestr.table).get(rejestr.adres+j).update({value: temperatures[i]}).run()
        // console.log(`zmiana ${rejestr.adres+j}: ${temperatures[i]} : ${rejestr.rej_last1[i]} : ${rejestr.rej_last2[i]} : ${rejestr.rej_last3[i]}`)
      } 
      j+=2
  }

}

function registersTempParser(response) {
  const result = [];   
  for (let i = 0; i < response.length; i+=4) {
    result.push(readIEEE754LEW(response, i, 23, 4).toFixed(1));
    // console.log(ieee754.read(response, i, true, 23, 4))
  }
  return result;
}


function ModbusHandler() {
  this.wyjscia={
    table: 'wyjscia',
    adres: 16901,
    howMany: 100,
    rej_first:[],
    rej_last: new Array(100).fill(0)
  }
  this.wySatel={
    table: 'wy_satel',
    adres: 17100,
    howMany: 40,
    rej_first:[],
    rej_last: new Array(40).fill(0)
  }
  this.wyTemp={
    table: 'wy_temp',
    adres: 17197,
    howMany: 16,
    rej_first:[],
    rej_last1: new Array(16).fill(0), 
    rej_last2: new Array(16).fill(0),
    rej_last3: new Array(16).fill(0)
  }
  this.tempNast={
    table: 'wy_temp',
    adres: 16389,
    howMany: 10,
    rej_first:[],
    rej_last1: new Array(8).fill(0),
  }

  this.init = ()=>{
    this.getInitRegisters();
    client.on('error', (err)=>console.error(err))
    client.on('connect', ()=>setInterval(this.modbusPooling, 1000))
  }

  this.modbusPooling=()=>{
    sprawdzZmianyAndUpdateTemp(this.tempNast)
    .then(res => registersTempParser(res))
    .then(temperatures => {
      updateTempNast(temperatures, this.tempNast)
      this.tempNast.rej_last1=[...temperatures]
    })
    sprawdzZmianyAndUpdate(this.wyjscia)
      .then(res => {
        this.wyjscia.rej_last=[...res]
      })
    sprawdzZmianyAndUpdate(this.wySatel)
      .then(res => {
        this.wySatel.rej_last=[...res]
      })
    sprawdzZmianyAndUpdateTemp(this.wyTemp)
      .then(res => registersTempParser(res))
      .then(temperatures => {
        updateTemp(temperatures, this.wyTemp)
        this.wyTemp.rej_last1=[...temperatures]
        this.wyTemp.rej_last2=[...this.wyTemp.rej_last1]
        this.wyTemp.rej_last3=[...this.wyTemp.rej_last2]
      })
  }
  // ustawienia 
  this.getInitRegisters=()=>{
    // rejestr tables must exist
    for (let i=0; i<this.wyjscia.howMany; i+=1){
      this.wyjscia.rej_first.push({id: this.wyjscia.adres+i, value: 0})
    }
    r.table(this.wyjscia.table).insert(this.wyjscia.rej_first).run()

    for (let i=0; i<this.wySatel.howMany; i+=1){
      this.wySatel.rej_first.push({id: this.wySatel.adres+i, value: 0})
    }
    r.table(this.wySatel.table).insert(this.wySatel.rej_first).run()
    let j=0
    for (let i=0; i<this.wyTemp.howMany; i+=1){
      this.wyTemp.rej_first.push({id: this.wyTemp.adres+j, value: 0})
      j+=2
    }
    r.table(this.wyTemp.table).insert(this.wyTemp.rej_first).run()
    j=0
    for (let i=0; i<this.tempNast.howMany; i+=1){
      this.tempNast.rej_first.push({id: this.tempNast.adres+j, value: 0})
      j+=2
    }
    r.table(this.tempNast.table).insert(this.tempNast.rej_first).run()
  }
  this.getUstawieniaLokali=(req, res)=>{
    r.table('lokale').orderBy('id').run()
      .then(lokale=> res.json({ustawienia:{lokale}}))
      .error((err)=>console.error(err)) 
  }
  this.getUstawieniaKonfiguracja=(req, res)=>{
    getKonfig()
      .then(result=>res.json({ustawienia: result}))
  }
  this.getUstawieniaRejestrOpis=(req, res)=>{
    r.table('rejestrOpis').orderBy('adres').run()
      .then(rejestrOpis=> res.json({ustawienia:{rejestrOpis}}))
      .error((err)=>console.error(err)) 
  }

  // zapisy
  this.zmienWy = (req, res)=>{
    const {adres, value} = req.body
    console.log(adres, value)
    client.writeSingleRegister(adres, value)
      .then(response=>res.json({response}))
      .catch(err=>console.log(err))
  }
  this.zmienTemp = (req, res)=>{
    const {adres, value} = req.body
    console.log(adres, value)
    let buf=Buffer.alloc(4)
    writeIEEE754LEW(buf, value, 0, 23, 4)
    // ieee754.write(buf, 25, 0, true, 23, 4)
    // console.log(buf, readIEEE754LEW(buf, 0, 23, 4), ieee754.read(buf, 0, true, 23, 4))
    client.writeMultipleRegisters(adres, buf)
      .then(response=>{
        console.log(response)
        res.json({response})
      })
      .catch(err=>console.log(err)) 
  }
  this.wyslij = (req, res)=>{
    let address=16902
    address=address===16902?16901:16902
    res.json({nowyAdres: address})
  }
}

export default ModbusHandler
