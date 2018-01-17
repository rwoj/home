import express from "express";
const app = express();
import routes from "./routes"
import config from "./config/config"
import modbus from "jsmodbus"
import horizon from '@horizon/server'

const client = modbus.client.tcp.complete(config.modbus).connect()

routes(app, client);

const port = process.env.PORT || 8081
const httpServer = app.listen(port, () => console.log(`Running on localhost: ${port}`));
const horizonServer = horizon(httpServer, config.horizon);
