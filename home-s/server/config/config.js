import dotenv from "dotenv"
dotenv.config()

export default {
  modbus: {
        host              : process.env.MODBUS_SERVER,
        port              : process.env.MODBUS_PORT,
        autoReconnect     : true,
        reconnectTimeout  : 1000,
        timeout           : 5000,
        unitId            : 0
  },
  db: {
    db: process.env.DB_NAME,
    servers: [{
          host: process.env.DB_HOST,
          port: process.env.DB_PORT
    }]
  },
  horizon: {
    auto_create_collection: true,
    auto_create_index: true,
    project_name: process.env.DB_NAME,
    permissions: false,
    auth: {
        allow_anonymous: true,
        allow_unauthenticated: true,
        token_secret: process.env.TOKEN_SECRET
    }
  }
}
