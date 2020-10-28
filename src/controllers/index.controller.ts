import { Request, Response } from 'express';
import { pool } from '../database';
import { QueryResult } from 'pg';


//Se obtiene un listado de todos los usuarios registrados
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM users ORDER BY id ASC');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

//Se obtiene un único usuario por su Id
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.json(response.rows);
};

//Permite la creación de un usuario
export const createUser = async (req: Request, res: Response) => {
    const { username, password, name, email } = req.body;
    const response = await pool.query('INSERT INTO users (username, password, name, email) VALUES ($1, $2)', [username, password, name, email]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: { username, password, name, email }
        }
    })
};

//Permite la actualización de datos de un usuario
export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { username, password, name, email } = req.body;

    const response = await pool.query('UPDATE users SET username = $1, password = $2, name = $3, email = $4 WHERE id = $5', [
        username, 
        password, 
        name, 
        email,
        id
    ]);
    res.json('User Updated Successfully');
};

//Elimina un usuario por su Id
export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};