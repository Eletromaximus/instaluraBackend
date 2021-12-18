import { Router } from 'express'
import CreateUserController from './controllers/CreateUserController'
import LoginUserController from './controllers/LoginUserController'

const router = Router()

const createUserController = new CreateUserController()
const loginUserController = new LoginUserController()

router.post(
  '/cadastro',
  createUserController.handle
)

router.get(
  '/login',
  loginUserController.handle
)

export default router
