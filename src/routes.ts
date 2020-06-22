import express from 'express';
const routes = express.Router();

import HomeController from '@controllers/HomeController';
import UserController from '@controllers/UserController';
import AuthController from '@controllers/AuthController';
import MessageController from '@controllers/MessageController';

const authController = new AuthController();
const homeController = new HomeController();
const userController = new UserController();
const messageController = new MessageController();

/** paginas */
    /* home */
    routes.get('/', homeController.index);

    /* users */
    routes.get('/user/new', userController.index);

    /* auth */
    routes.get('/login', authController.index);

/* api */
    /* auth */
    routes.post('/login', authController.login);
    routes.post('/logout', authController.logout);

    /* users */
    routes.get('/users/search', userController.search);
    routes.get('/users/show', userController.show);
    routes.post('/users/create', userController.create);

    /* messages */
    routes.get('/messages', messageController.index);

export default routes;