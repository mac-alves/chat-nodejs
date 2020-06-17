import { Request, Response } from 'express';

class HomeController {
    async index(request: Request, response: Response){
        response.render('pages/index.ejs');
    }
}

export default HomeController;