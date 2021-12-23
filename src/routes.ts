import { Router } from 'express'
import cors from 'cors'
import CreateUserController from './controllers/CreateUserController'
import LoginUserController from './controllers/LoginUserController'
import ensureAuthenticated from './middlewares/ensureAutenticated'
import AuthUserController from './controllers/AuthUserController'

const router = Router()

const createUserController = new CreateUserController()
const loginUserController = new LoginUserController()
const authUserController = new AuthUserController()

const corsOptions = {
  origin: 'https://insta-alura-git-main-maxmillianox.vercel.app/',
  optionsSuccessStatus: 200
}

router.post(
  '/cadastro',
  cors(corsOptions),
  createUserController.handle
)

router.post(
  '/login',
  cors(corsOptions),
  loginUserController.handle,
  ensureAuthenticated
)

router.post(
  '/auth',
  cors(corsOptions),
  authUserController.handle
)

export default router
