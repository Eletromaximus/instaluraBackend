import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'

export default class AuthUserController {
  async handle (req: Request, res: Response) {
    const prisma = new PrismaClient()
    try {
      const content = req.headers.authorization

      if (!content) {
        return res.status(401).json({
          message: 'Token is missing'
        })
      }

      const [, token] = content.split(' ')

      const { sub } = verify(token, String(process.env.KEY_TOKEN))

      if (sub) {
        const confirm = await prisma.user.findFirst({
          where: {
            id: sub as string
          }
        })

        if (confirm) {
          return res.status(200).json({ authenticated: true })
        }
      }
      return res.status(401).json({ authenticated: false })
    } catch {
      res.status(500).json({
        message: 'Erro interno, tente mais tarde'
      })
    }
  }
}
