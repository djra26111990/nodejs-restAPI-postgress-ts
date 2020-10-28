import express, { Application } from 'express';
import indexRoutes from './routes/index';

//Se inicializa express
const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(indexRoutes);

// Message Server is Up
app.listen(3000, () => {
    console.log('Server is online on port', 3000);
})