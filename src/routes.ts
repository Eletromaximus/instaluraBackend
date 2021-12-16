import { Router } from 'express'
import CreateCadastroController from './controllers/CreateCadastroController'

const router = Router()

const createCadastroController = new CreateCadastroController()

router.post(
  '/cadastro',
  createCadastroController.handle
)

export default router
