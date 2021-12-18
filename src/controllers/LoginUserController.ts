import { Request, Response } from 'express'
import LoginUserService from '../services/LoginUserService'

export default class AutenticateUserController {
  async handle (req: Request, res: Response) {
    const { name, password } = req.body

    try {
      if (!name || !password) {
        res.status(400).json({
          message: 'nome e senha obrigatórios'
        })
      }

      const loginUserService = new LoginUserService()

      const verify = await loginUserService.search(name, password)

      if (verify) {
        const auth = await loginUserService.auth(verify)

        return res.status(200).send(auth)
      }
    } catch (error: any) {
      res.status(error.status).json(error.message)
    }
  }
}
