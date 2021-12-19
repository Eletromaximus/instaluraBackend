import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'

class GenerateRefreshToken {
  async execute (userId: string) {
    const prisma = new PrismaClient()
    const expiresIn = dayjs().add(15, 'second').unix()

    const tokenExist = await prisma.refreshToken.findFirst({
      where: {
        userId
      }
    })

    if (tokenExist) {
      return await prisma.refreshToken.update({
        where: {
          userId
        },
        data: {
          expiresIn
        }
      })
    }

    await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    })
  }
}

export { GenerateRefreshToken }
