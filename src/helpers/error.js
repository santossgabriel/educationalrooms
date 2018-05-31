import httpStatus from 'http-status'
import sequelize from '../infra/db/models/index'

const { Log } = sequelize

export const throwValidationError = (message) => {
  throw { status: httpStatus.UNPROCESSABLE_ENTITY, message: message }
}

export const throwAuthError = (message) => {
  throw { status: httpStatus.UNAUTHORIZED, message: message }
}

export const throwForbiddenError = (message) => {
  throw { status: httpStatus.FORBIDDEN, message: message }
}

export const authError = (err, res, req) => {
  let msg
  if (typeof err === 'string') msg = err
  else if (err && err.message === 'jwt expired') msg = 'Token expirou.'
  else msg = 'Não autorizado.'
  handlerError({ status: httpStatus.UNAUTHORIZED, message: msg }, res, req)
}

const requestToLog = (request) => {
  let log = {}
  log.hostname = request.hostname
  log.ip = request.ip
  log.protocol = request.protocol
  log.path = request.path
  log.method = request.method
  log.claims = request.claims
  log.route = request.route
  log.body = request.body
  log.params = request.params
  return log
}

const handlerError = async (error, res, req) => {
  if (error.status) {
    res.status(error.status).json({ message: error.message })
  } else {
    let log = requestToLog(req)
    log.error = error
    const logDB = await Log.create({ date: new Date(), description: JSON.stringify(log) })
    res.status(httpStatus.INTERNAL_SERVER_ERROR)
      .json(`Ocorreu um erro interno. Nos envie uma solicitação enviando o código ${logDB.id}`)
  }
}

export const asyncErrorHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    handlerError(err, res, req)
  })
}