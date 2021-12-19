import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'

class GenerateRefreshToken {
  async execute (userId: string) {
    const prisma = new PrismaClient()
    const expiresIn = dayjs().add(15, 'second').unix()

    await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    })
  }
}

export { GenerateRefreshToken }
