export const Type = {
  VALIDATION: 1,
  AUTH: 2
}

export const throwValidationError = (message) => {
  throw { type: Type.VALIDATION, message: message }
}

export const authError = (res, err) => {
  let msg
  if (typeof err === 'string') msg = err
  else if (err && err.message === 'jwt expired') msg = 'Token expirou.'
  else msg = 'Não autorizado.'
  handlerError({ type: Type.AUTH, message: msg }, res)
}

export const handlerError = (error, res) => {
  switch (error.type) {
    case Type.VALIDATION:
      res.status(422)
      res.json(error)
      break
    case Type.AUTH:
      res.status(401)
      res.json({ message: error.message })
      break
    default:
      res.status(500)
      res.end({ message: 'Erro interno do servidor.' })
      break
  }
}