// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import knex from '../database/connection'

class AuthController {
  async index (request: Request, response: Response) {
    response.render('pages/login.ejs')
  }

  async login (request: Request, response: Response) {
    const { name } = request.body
    const user = await knex('users').select('*').where('name', name)

    if (user.length === 0) {
      return response.status(401).json({
        error: 'Usuario não encontrado!',
        success: false
      })
    }

    if (request.session) {
      request.session.userId = user[0].id
    }

    response.status(200).json({ error: '', success: true, userId: user[0].id })
  }

  async logout (request: Request, response: Response) {
    if (request.session) {
      request.session.userId = null
    }

    return response.status(200).json({ error: '', success: true })
  }
}

export default AuthController
