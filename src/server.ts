import express from 'express'
import router from './routes'
import 'express-async-errors'
import handleError from './utils/HandleError'

const app = express()

app.use(express.json())

app.use(router)

app.use(handleError)

app.listen(process.env.PORT || 4000, () => {
  console.log('Bem vindo ao server')
})
