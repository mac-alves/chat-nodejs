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

/* home */
routes.get('/', homeController.index);
/* -------- */

/* auth */
routes.get('/login', authController.index);
routes.post('/login', authController.login);
routes.post('/logout', authController.logout);
/* -------- */

/* users */
routes.get('/user-new', userController.index);
routes.post('/users', userController.create);

/* messages */
routes.get('/messages', messageController.index);

export default routes;