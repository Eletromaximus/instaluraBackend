import { Router } from 'express'
import CreateUserController from './controllers/CreateUserController'
import AutenticateUserController from './controllers/AutenticateController'

const router = Router()

const createUserController = new CreateUserController()
const autenticateUserController = new AutenticateUserController()

router.post(
  '/cadastro',
  createUserController.handle
)

router.get(
  '/auth',
  autenticateUserController.handle
)

export default router
