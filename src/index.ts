import express, { Application } from 'express';
import indexRoutes from './routes/index';
import * as dotenv from 'dotenv'

//Se inicializa dotenv para utilizar variables .env
dotenv.config();

//Se inicializa express
const app: Application = express();

//Se declara el puerto del server en una const
const port = process.env.DB_PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(indexRoutes);

//Se abre la conexión del servidor
app.listen(port, () => {
    console.log(`Server está activo en el puerto: ${port}`);
});