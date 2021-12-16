import { PrismaClient } from '@prisma/client'
import { CustomError } from '../utils/CustomError'
import crypto from 'crypto'

export class CreateCadastroService {
  async execute (name: string, password: string) {
    const prisma = new PrismaClient()
    const salt = crypto.randomBytes(16).toString('hex')

    try {
      const hash = crypto.createHmac('sha512', salt)
      hash.update(`${name}:${password}`)
      const result = hash.digest('hex')

      const { id } = await prisma.database.create({
        data: {
          result,
          salt
        }
      })

      return {
        id
      }
    } catch (err) {
      console.log(err)

      const error = new CustomError(
        'Serviço indisponível',
        500
      )
      return error
    }
  }

  async search (name: string, password: string) {
    const prisma = new PrismaClient()
    const salt = crypto.randomBytes(16).toString('hex')

    try {
      const hash = crypto.createHmac('sha512', salt)
      hash.update(`${name}:${password}`)
      const result = hash.digest('hex')

      const resultDb = await prisma.database.findFirst({
        where: {
          result
        }
      })

      if (result === resultDb?.result) {
        return { message: 'Essa conta já existe' }
      }

      return
    } catch (err) {
      console.log(err)
      const error = new CustomError(
        'Error interno',
        500
      )

      return error
    }
  }
}
