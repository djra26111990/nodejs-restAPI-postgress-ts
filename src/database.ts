import { Pool } from 'pg';
import * as dotenv from 'dotenv'

dotenv.config();

//Se exporta 'pool' con los datos de conexion
export const pool = new Pool({
    user: process.env.USER_NAME_DB,
    host: process.env.HOST_DB_NAME,
    password: process.env.PASSWORD_DB,
    database: process.env.DB_NAME,
    port: 5432
})
