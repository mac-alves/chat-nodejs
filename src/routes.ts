import express from 'express';
const routes = express.Router();

import HomeController from './controllers/HomeController';
import UserController from './controllers/UserController';

const homeController = new HomeController();
const userController = new UserController();

routes.get('/', homeController.index);

routes.get('/users', userController.index);
routes.post('/users', userController.create);

export default routes;