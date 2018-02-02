import express from "express"
import bodyParser from "body-parser"
import routes from "./routes"
import config from "./config/config"
// import modbus from "jsmodbus"
import horizon from '@horizon/server'

const app = express();

// const client = modbus.client.tcp.complete(config.modbus).connect()
// routes(app, client);
app.use(bodyParser.json());
routes(app);

const port = process.env.PORT || 8081
const httpServer = app.listen(port, () => console.log(`Running on localhost: ${port}`));
const horizonServer = horizon(httpServer, config.horizon);
