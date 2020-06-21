import { Request, Response } from 'express';
import knex from '../database/connection';

class MessageController {
    async index(request: Request, response: Response) {
        if (!request.session?.userId) return response.redirect('login');
        
        const userLogeed = request.session?.userId;
        const { idContact } = request.query;
        
        const previousPosts = await knex('posts')
            .select(
                'posts.*',  
                'usr_to.name as to_name', 
                'usr_from.name as from_name'
            ).join('users as usr_to', 'posts.to_user', '=', 'usr_to.id')
            .join('users as usr_from', 'posts.from_user', '=', 'usr_from.id')
            .where({
                'posts.from_user': userLogeed,
                'posts.to_user': idContact,
            })
            .orWhere({
                'posts.to_user': userLogeed,
                'posts.from_user': idContact,
            });
        
        return response.status(200).json({ 
            error: '', 
            success: true, 
            posts: previousPosts
        });
    }
}

export default MessageController;