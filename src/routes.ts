import { Router } from 'express'
import CreateUserController from './controllers/CreateUserController'
import LoginUserController from './controllers/LoginUserController'
import ensureAuthenticated from './middlewares/ensureAutenticated'
import AuthUserController from './controllers/AuthUserController'

const router = Router()

const createUserController = new CreateUserController()
const loginUserController = new LoginUserController()
const authUserController = new AuthUserController()

router.post(
  '/cadastro',
  createUserController.handle
)

router.post(
  '/login',
  loginUserController.handle,
  ensureAuthenticated
)

router.post(
  '/auth',
  authUserController.handle
)

export default router
