import { CustomError } from './CustomError'
import { Response } from 'express'

export default function handleError (
  error: TypeError | CustomError,
  res: Response
) {
  let customError = error

  if (!(error instanceof CustomError)) {
    customError = new CustomError(
      'Serviço indisponível, tente mais tarde'
    )
  }

  res.status((customError as CustomError).status).json(customError.message)
}
