import { Request, Response } from 'express';
import { pool } from '../database';
import { QueryResult } from 'pg';
import bcryptjs from 'bcryptjs'

const roundSalt = 10;

//Se obtiene un listado de todos los usuarios registrados
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM users ORDER BY id ASC');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
};

//Se obtiene un único usuario por su Id
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.status(200).json(response.rows);
    } catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
    
};

//Permite la creación de un usuario
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password, name, email } = req.body;
    const passwordHashed = await bcryptjs.hash(password, roundSalt);
    await pool.query('INSERT INTO users (username, password, name, email) VALUES ($1, $2, $3, $4)', [username, passwordHashed, name, email]);
    return res.status(200).json({
        message: 'User Added successfully',
        body: {
            user: { username, passwordHashed, name, email }
        }
    });
    } catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
};

//Permite la actualización de datos de un usuario
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const { username, password, name, email } = req.body;
        const passwordHashed = await bcryptjs.hash(password, roundSalt);
        await pool.query('UPDATE users SET username = $1, password = $2, name = $3, email = $4 WHERE id = $5', [
            username, 
            passwordHashed, 
            name, 
            email,
            id
        ]);
        return res.status(200).json({
            message: 'User updated succesfully',
            body: {
                user: { username, passwordHashed, name, email }
            }
        });
    } catch(e) {
        console.log(e);
        return res.status(500).json('Internal Error Server');
    }
};

//Elimina un usuario por su Id
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM users where id = $1', [
            id
        ]);
        return res.json(`User ${id} deleted Successfully`);
    } catch(e) {
        console.log(e);
        return res.status(500).json('Internal Error Server');
    }
};
