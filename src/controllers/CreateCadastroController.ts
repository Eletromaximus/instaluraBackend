import { Request, Response } from 'express'
import { CreateCadastroService } from '../services/CreateCadastroService'
import { CustomError } from '../utils/CustomError'

export default class CreateCadastroController {
  async handle (req: Request, res: Response) {
    const { name, password } = req.body

    try {
      if (!name || !password) {
        return res.json('Invalid Request').status(400)
      }

      const createCadastroService = new CreateCadastroService()

      const verify = await createCadastroService.search(name)

      if (verify !== undefined) {
        return res.status(400).json({
          message: 'Usuário já existe'
        })
      }

      const cadastro = await createCadastroService.execute(name, password)
      console.log(verify)
      res.status(200).send(cadastro)
    } catch (err) {
      const error = new CustomError('Serviço indisponível')
      return error
    }
  }
}
