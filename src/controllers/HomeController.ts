import { Request, Response } from 'express';

class HomeController {
    async index(request: Request, response: Response){
        if (!request.session?.userId) return response.redirect('login');
        response.render('pages/index.ejs');
    }
}

export default HomeController;