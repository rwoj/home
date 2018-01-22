import rethinkdbdash from "rethinkdbdash"
import config from "../config/config"
import modbus from "jsmodbus"

const client = modbus.client.tcp.complete(config.modbus).connect()
const r = rethinkdbdash(config.db)
// Odczyty
// r.tableCreate('wyjscia')
// r.tableCreate('wy_satel')
// r.tableCreate('wy_temp')

async function sprawdzZmianyAndUpdate(adres, howMany, lastRej){
  const resp=await client.readHoldingRegisters(adres, howMany)
  for(let i = 0; i< resp.register.length; i+=1){
    if (lastRej[i]!==resp.register[i]) {
      r.table('rejestr').get(adres+i).update({value: resp.register[i]}).run()
      console.log(`zmiana ${adres+i}: ${resp.register[i]}`)
    }
  }
  return resp.register
}

function ModbusHandler() {
  this.address=16901;
  this.howMany=100
  this.rej_first=[]
  this.rej_last=new Array(this.howMany).fill(0);

  this.init = ()=>{
    this.getInitRegister();
    client.on('error', (err)=>console.error(err))
    client.on('connect', ()=>setInterval(this.modbusPooling, 1500))
  }

  this.modbusPooling=()=>{
    sprawdzZmianyAndUpdate(this.address, this.howMany, this.rej_last)
      .then(res => {
        this.rej_last=[...res]
      })
  }
  // ustawienia 
  this.getInitRegister=()=>{
    // rejestr table must exist
    for (let i=0; i<this.howMany; i+=1){
      this.rej_first.push({id: this.address+i, value: 0})
    }
    r.table('rejestr').insert(this.rej_first).run()
  }
  this.getUstawieniaLokali=(req, res)=>{
    r.table('lokale').orderBy('id').run()
      .then(lokale=> res.json({ustawienia:{lokale}}))
      .error((err)=>console.error(err)) 
  }
  this.getUstawieniaRejestrOpis=(req, res)=>{
    r.table('rejestrOpis').orderBy('id').run()
      .then(rejestrOpis=> res.json({ustawienia:{rejestrOpis}}))
      .error((err)=>console.error(err)) 
  }

  // zapisy
  this.wyslij = (req, res)=>{
    this.address=this.address===16902?16901:16902
    res.json({nowyAdres: this.address})
  }
}

export default ModbusHandler