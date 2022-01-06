import express from 'express'
import router from './routes'
import cors from 'cors'
import 'express-async-errors'
import handleError from './utils/HandleError'
import helmet from 'helmet'

const app = express()

app.use(express.json())

app.use(helmet())

app.use(cors({
  origin: [
    'https://insta-alura-git-main-maxmillianox.vercel.app',
    'insta-alura-8t250iksu-maxmillianox.vercel.app',
    'https://insta-alura.vercel.app/'
  ],
  optionsSuccessStatus: 200
}))

app.use(router)

app.use(handleError)

app.listen(process.env.PORT || 4000, () => {
  console.log('Bem vindo ao server')
})
