import { Request, Response } from 'express';
import knex from '../database/connection';
 
class UserController {
    async index(request: Request, response: Response) {
        response.render('pages/register.ejs');
    }

    async create(request: Request, response: Response){        
        const { name } = request.body;
        const user = await knex('users').select('*').where('name', name);
        
        if (user.length > 0) {
            return response.status(401).json({ 
                error: 'Usuario ja existe!', 
                success: false 
            });
        }

        const newUser = await knex('users').insert({ name });

        if (request.session) {
            request.session.userId = newUser[0];
        }
        
        return response.status(200).json({ 
            error: '', 
            success: true, 
            userId: newUser[0]
        });
    }
}

export default UserController;