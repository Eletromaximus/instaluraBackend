import { prisma } from '../db'
import { CustomError } from '../utils/CustomError'
import crypto from 'crypto'

export class CreateUserService {
  async execute (name: string, password: string) {
    const salt = crypto.randomBytes(16).toString('hex')

    const bdName = await prisma.user.findFirst({
      where: {
        name
      }
    })

    if (bdName?.name === name) {
      throw new CustomError(
        'Usuário já existe',
        400
      )
    }

    const hash = crypto.createHmac('sha512', salt)
    hash.update(`${name}:${password}`)
    const result = hash.digest('hex')

    await prisma.user.create({
      data: {
        hash: result,
        salt,
        name: name
      }
    })

    return true
  }
}
