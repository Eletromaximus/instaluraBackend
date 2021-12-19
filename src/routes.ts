import { Router } from 'express'
import CreateUserController from './controllers/CreateUserController'
import LoginUserController from './controllers/LoginUserController'
import ensureAuthenticated from './middlewares/ensureAutenticated'

const router = Router()

const createUserController = new CreateUserController()
const loginUserController = new LoginUserController()

router.post(
  '/cadastro',
  createUserController.handle
)

router.post(
  '/login',
  loginUserController.handle,
  ensureAuthenticated
)

export default router
