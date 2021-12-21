import { prisma } from '../db'
import dayjs from 'dayjs'

class GenerateRefreshToken {
  async execute (userId: string) {
    const expiresIn = dayjs().add(7, 'day').unix()

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
