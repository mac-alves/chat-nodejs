import express from 'express';
import knex from './database/connection';
const routes = express.Router();

import UserController from './controllers/UserController';

const userController = new UserController();

routes.get('/', async (request, response) => {
    const itens = await knex('itens').select('*');
    
    return response.json(itens);
});

routes.get('/users', userController.index);
routes.post('/users', userController.create);

export default routes;