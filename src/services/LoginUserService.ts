import { prisma } from '../db'
import crypto from 'crypto'
import { CustomError } from '../utils/CustomError'
import { sign } from 'jsonwebtoken'

export default class LoginUserService {
  async search (name: string, password: string) {
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
      const token = sign({}, String(process.env.KEY_TOKEN), {
        subject: data.id,
        expiresIn: '7d'
      })

      return { token, id: data.id }
    }

    throw new CustomError('Usuário ou senha incorretos', 400)
  }
}
