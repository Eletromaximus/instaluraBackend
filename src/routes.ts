import { Router } from 'express'
import CreateUserController from './controllers/CreateUserController'
import LoginUserController from './controllers/LoginUserController'
import ensureAuthenticated from './middlewares/ensureAutenticated'
import GenerateAuthenticate from './provider/GenerateAuthenticate'

const router = Router()

const createUserController = new CreateUserController()
const loginUserController = new LoginUserController()
const generateAuthenticate = new GenerateAuthenticate()

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
  generateAuthenticate.execute
)

export default router
