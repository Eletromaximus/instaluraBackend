import { PrismaClient } from '@prisma/client'
import { CustomError } from '../utils/CustomError'
import crypto from 'crypto'

export class CreateUserService {
  async execute (name: string, password: string) {
    const prisma = new PrismaClient()
    const salt = crypto.randomBytes(16).toString('hex')

    try {
      const hash = crypto.createHmac('sha512', salt)
      hash.update(`${name}:${password}`)
      const result = hash.digest('hex')

      await prisma.database.create({
        data: {
          result,
          salt,
          name
        }
      })

      return {
        result
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

  async search (name: string) {
    const prisma = new PrismaClient()

    try {
      const bdName = await prisma.database.findUnique({
        where: {
          name
        }
      })

      if (bdName?.name === name) {
        return new CustomError(
          'Usuário já existe',
          400
        )
      }

      return
    } catch (err) {
      return new CustomError(
        'Erro desconhecido, tente mais tarde',
        500
      )
    }
  }
}
