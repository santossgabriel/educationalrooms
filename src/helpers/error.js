export const Type = {
  VALIDATION_ERROR: 1
}

export const throwValidationError = (message) => {
  throw { type: Type.VALIDATION_ERROR, message: message }
}

export const handlerError = (error, res) => {
  switch (error.type) {
    case Type.VALIDATION_ERROR:
      res.status(422)
      res.json(error)
      break
    default:
      res.status(500)
      res.end('Erro interno do servidor.')
      break
  }
}