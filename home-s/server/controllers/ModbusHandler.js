import rethinkdbdash from "rethinkdbdash"
import config from "../config/config"

const r = rethinkdbdash(config.db)
// r.tableCreate('rejestr').then(()=>console.log("table created"))

const updateRegister=(rejPoczatkowy, rejNowy, adrPoczatkowy)=>{
  for(let i = 0; i< rejNowy.length; i+=1){
    if (rejPoczatkowy[i]!==rejNowy[i]) {
      r.table('rejestr').get(adrPoczatkowy+i).update({value: rejNowy[i]}).run()
      console.log(`zmiana ${adrPoczatkowy+i}: ${rejNowy[i]}`)
    }
  }
}

const czyZmiana=(rejPoczatkowy, rejNowy)=>{
  for(let i = 0; i< rejNowy.length; i+=1){
    if (rejPoczatkowy[i]!==rejNowy[i]) return true
  }
  return false
}


export default function ModbusHandler(client) {
  this.rej_last=new Array(50);
  this.rej_first=[];
  this.address=16901;

  this.init = ()=>{
    for (let i=0; i<50; i+=1){
      this.rej_first.push({id: this.address+i, value: 0})
    }
    // r.table('rejestr').insert(rej_first).run()
    client.on('error', (err)=>console.error(err))
    client.on('connect', ()=>setInterval(this.modbusPooling, 1500))
  }
  this.modbusPooling=()=>{
    client.readHoldingRegisters(this.address, 50)
      .then((resp)=>{
        if (czyZmiana(this.rej_last, resp.register)){
          updateRegister(this.rej_last, resp.register, this.address)
          this.rej_last=[...resp.register]
        }
    })
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
  this.wyslij = (req, res)=>{
    this.address=this.address===16902?16901:16902
    res.json({nowyAdres: this.address})
  }
}

