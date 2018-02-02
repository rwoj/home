import ModbusHandler from "../controllers/ModbusHandler"

const path=`${process.cwd()}/server`;
// const routes=(app, client)=>{

const routes=(app)=>{
  const modHandler =  new ModbusHandler()
  modHandler.init()

  app.get("/", (req, res) => {
    res.sendFile(`${path}/index.html`);
  })

  app.get("/api/ustawienia/lokale", modHandler.getUstawieniaLokali);
  app.get("/api/ustawienia/konfiguracja", modHandler.getUstawieniaKonfiguracja);
  app.get("/api/ustawienia/rejestrOpis", modHandler.getUstawieniaRejestrOpis);

  // to be defined
  app.get("/api/rejestr", modHandler.wyslij)
  
  app.post("/api/rejestr/wy", modHandler.zmienWy)
  
  app.post("/api/rejestr/temp", modHandler.zmienTemp)
}
export default routes
