import ModbusHandler from "../controllers/ModbusHandler"

const path=`${process.cwd()}/server`;
// const routes=(app, client)=>{

const routes=(app)=>{
  const modHandler =  new ModbusHandler()
  modHandler.init()

  app.get("/", (req, res) => {
    res.sendFile(`${path}/index.html`);
  });

  app.get("/api/ustawienia/lokale", modHandler.getUstawieniaLokali);
  app.get("/api/ustawienia/rejestrOpis", modHandler.getUstawieniaRejestrOpis);

  // to be defined
  app.get("/api/wyslij", modHandler.wyslij)
}
export default routes
