import express from 'express';
const routes = express.Router();

import HomeController from '@controllers/HomeController';
import UserController from '@controllers/UserController';
import AuthController from '@controllers/AuthController';

const authController = new AuthController();
const homeController = new HomeController();
const userController = new UserController();

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

export default routes;