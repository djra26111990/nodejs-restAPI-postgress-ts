import { Pool } from 'pg';
import * as dotenv from 'dotenv'

dotenv.config();

const DB_PORT_ENV = process.env.DB_PORT
const DB_PORT = parseInt(DB_PORT_ENV!);


//Se exporta 'pool' con los datos de conexion
export const pool = new Pool({
    user: process.env.USER_NAME_DB,
    host: process.env.HOST_DB_NAME,
    password: process.env.PASSWORD_DB,
    database: process.env.DB_NAME,
    port: DB_PORT
})
