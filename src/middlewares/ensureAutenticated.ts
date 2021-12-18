import { Request, Response, NextFunction, response } from 'express'
import { verify } from 'jsonwebtoken'

export default function ensureAuthenticated (
  res: Response,
  req: Request,
  next: NextFunction
) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return response.status(401).json({
      message: 'Token is missing'
    })
  }

  const [, token] = authToken.split(' ')

  try {
    verify(token, '78cY0034-d885-46ad-sl33-5tF9PRTcc457')
  } catch {
    return res.status(401).json({
      message: 'Token invalid'
    })
  }
}
