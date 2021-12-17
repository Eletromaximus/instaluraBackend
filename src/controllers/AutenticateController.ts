import { Request, Response } from 'express'
import AutenticateUserService from '../services/AutenticateUserService'

export default class AutenticateUserController {
  async handle (req: Request, res: Response) {
    const { name, password } = req.body

    try {
      if (!name || !password) {
        res.status(400).json({
          message: 'nome e senha obrigatórios'
        })
      }

      const autenticateUserService = new AutenticateUserService()

      const verify = await autenticateUserService.search(name, password)

      if (verify) {
        const auth = await autenticateUserService.auth(verify)
      }
    } catch (error: any) {
      res.status(error.status).json(error.message)
    }
  }
}
