import { Request, Response } from 'express'
import { GenerateRefreshToken } from '../provider/GenerateRefreshToken'
import LoginUserService from '../services/LoginUserService'

export default class LoginUserController {
  async handle (req: Request, res: Response) {
    const { name, password } = req.body

    try {
      if (!name || !password) {
        return res.status(400).json({
          message: 'nome e senha obrigatórios'
        })
      }

      const loginUserService = new LoginUserService()
      const { token, id } = await loginUserService.search(name, password)

      const generateRefreshToken = new GenerateRefreshToken()
      await generateRefreshToken.execute(id)

      return res.status(200).json({ token: token })
    } catch (error: any) {
      return res.status(error.status || 500)
        .json(error.message || { message: 'Erro Interno, tente mais tarde' })
    }
  }
}
