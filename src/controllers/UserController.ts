import { Request, Response } from 'express';
import knex from '../database/connection';
 
class UserController {
    async index(request: Request, response: Response) {
        const users = await knex('users').select('*');

        return response.json(users);
    }

    async create(request: Request, response: Response){
        const { name } = request.body;

        await knex('users').insert({ name });

        return response.json({ success: true })
    }
}

export default UserController;  