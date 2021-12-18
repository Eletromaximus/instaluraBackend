import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { CustomError } from '../utils/CustomError'

export default class LoginUserService {
  async search (name: string, password: string) {
    const prisma = new PrismaClient()

    const data = await prisma.database.findUnique({
      where: { name }
    })

    if (data === null) {
      throw new CustomError(
        'Usuário ou Senha inválidos',
        400
      )
    }

    const hash = crypto.createHmac('sha512', data.salt)
    hash.update(`${name}:${password}`)
    const result = hash.digest('hex')

    if (result === data.result) {
      return result
    }

    throw new CustomError('Usuário ou senha incorretos', 400)
  }

  async auth (result: string) {
    const prisma = new PrismaClient()

    const data = await prisma.tokendb.findUnique({
      where: {
        hash: result
      }
    })

    if (data?.token) {
      return data?.token
    }

    const token = jwt.sign({}, '78cY0034-d885-46ad-sl33-5tF9PRTcc457', {
      subject: 'Isso! parabéns',
      expiresIn: '7d'
    })

    const update = await prisma.tokendb.update({
      where: {
        hash: result
      },
      data: {
        token
      }
    })

    if (!update) {
      throw new CustomError(
        'Error interno, tente mais tarde',
        500
      )
    }

    return token
  }
}
