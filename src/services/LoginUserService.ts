import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { CustomError } from '../utils/CustomError'
import { sign } from 'jsonwebtoken'

export default class LoginUserService {
  async search (name: string, password: string) {
    const prisma = new PrismaClient()

    const data = await prisma.user.findUnique({
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

    if (result === data.hash) {
      const token = sign({}, '78cY0034-d885-46ad-sl33-5tF9PRTcc457', {
        subject: 'Isso! parabéns',
        expiresIn: '7d'
      })

      return { token, id: data.id }
    }

    throw new CustomError('Usuário ou senha incorretos', 400)
  }
}