import { Request, Response } from 'express'
import { CreateUserService } from '../services/CreateUserService'

export default class LoginUserController {
  async handle (req: Request, res: Response) {
    const { name, password } = req.body

    try {
      if (!name || !password) {
        return res.json('Invalid Request').status(400)
      }

      const createCadastroService = new CreateUserService()

      const cadastro = await createCadastroService.execute(name, password)

      if (cadastro) {
        return res.status(200)
      }

      return res.status(500).json('erro interno, tente mais tarde')
    } catch (err: any) {
      // const error = new CustomError('Serviço indisponível')
      res.status(err.status || 500)
        .send(err.message || { message: 'Erro Interno, tente mais tarde' })
    }
  }
}
