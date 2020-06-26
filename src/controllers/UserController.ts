import { Request, Response } from 'express';
import knex from '../database/connection';
import crypto from 'crypto';
 
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
        const token = crypto.randomBytes(5).toString('hex');
        const userId = await knex('users').insert({ name, token }).returning('id');
        const newUser = await knex('users').select('*').where('id', userId[0]);

        if (request.session) {
            request.session.userId = newUser[0].id;
        }
        
        return response.status(200).json({ 
            error: '', 
            success: true, 
            user: newUser[0]
        });
    }

    async search(request: Request, response: Response){
        if (!request.session?.userId) return response.redirect('login');

        const userLogeed = request.session?.userId;
        const { nameUser } = request.query;

        const users = await knex('users')
            .select('*')
            .where('name', 'like', `%${nameUser}%`)
            .andWhere('id', '<>', userLogeed);

        return response.status(200).json({ 
            error: '', 
            success: true, 
            users
        });
    }

    async show(request: Request, response: Response){
        if (!request.session?.userId) return response.redirect('login');

        const userLogeed = request.session?.userId;
        
        const usersPosts = await knex('posts')
            .distinct('from_user', 'to_user')
            .where({
                'posts.from_user': userLogeed,
            })
            .orWhere({
                'posts.to_user': userLogeed,
            });

        if (usersPosts.length === 0) {
            return response.status(200).json({ 
                error: '', 
                success: true, 
                users: []
            });
        }
        
        const idUsers = [...new Set(usersPosts.map(user => {
            if (user.from_user === userLogeed) {
                return user.to_user
            }

            if (user.to_user === userLogeed) {
                return user.from_user
            }
        }))];
        
        const users = await knex('users')
            .select('*')
            .whereIn('id', idUsers);

        return response.status(200).json({ 
            error: '', 
            success: true, 
            users
        });
    }
}

export default UserController;