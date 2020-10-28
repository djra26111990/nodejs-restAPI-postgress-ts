import { Pool } from 'pg';

//Se exporta 'pool' con los datos de conexion
export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "",
    database: "firstapi",
    port: 5432
})