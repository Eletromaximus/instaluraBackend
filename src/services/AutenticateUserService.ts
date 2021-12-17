import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { CustomError } from '../utils/CustomError'

export default class AutenticateUserService {
  async search (name: string, password: string) {
    const prisma = new PrismaClient()
    // verificar se user existe
    const data = await prisma.database.findUnique({
      where: { name }
    })

    if (data === null) {
      throw new CustomError(
        'Usuário inválido',
        400
      )
    }

    const hash = crypto.createHmac('sha512', data.salt)
    hash.update(`${name}:${password}`)
    const result = hash.digest('hex')

    if (result === data.result) {
      return result
    }

    throw new CustomError('Nome ou senha incorretos', 400)
  }

  async auth (result: string) {
    const prisma = new PrismaClient()

    const data = await prisma.tokendb.findUnique({
      where: {
        hash: result
      }
    })

    if (data?.token) {
      data.token.
    }

    const token = jwt.sign({
      payload: 'Parabéns, tá top! Continue assim'
    }, process.env.SECRET as string, {
      algorithm: 'ES512',
      expiresIn: '7d'
    })
    return token
  }
}
