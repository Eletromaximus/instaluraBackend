import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'

export default class GenerateAuthenticate {
  async execute (req: Request, res: Response) {
    const { token } = req.body
    const prisma = new PrismaClient()

    try {
      const id = verify(token, '78cY0034-d885-46ad-sl33-5tF9PRTcc457')
      console.log(id)

      if (id) {
        const frontToken = await prisma.user.findFirst({
          where: {
            id: id.sub as string
          }
        })

        if (frontToken) {
          return res.status(200).json({ authenticated: true })
        }
      }
      return res.status(401).json({ authenticated: false })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: 'Erro interno, tente mais tarde'
      })
    }
  }
}
