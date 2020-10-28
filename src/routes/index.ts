import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/index.controller';

// Se inicializa Router y se guarda en una const llamada router el objeto que devuelve
const router = Router();

//Se declaran las rutas y se pasa de argumento las funciones correspondientes importadas desde el controller

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser);

export default router;