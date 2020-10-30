import { Request, Response } from 'express';
import { repository } from '../utils/repository.utils'

const opUsers = new repository();

//Se obtiene un listado de todos los usuarios registrados
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    return await opUsers.obtainUsers(req, res);
}

//Se obtiene un único usuario por su Id
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    return await opUsers.obtainOneUserByID(req, res);
};

//Permite la creación de un usuario
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    return await opUsers.createNewUser(req, res);
};

//Permite la actualización de datos de un usuario
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    return await opUsers.updateUserById(req, res);
};

//Elimina un usuario por su Id
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    return await opUsers.deleteUserById(req, res);
};
