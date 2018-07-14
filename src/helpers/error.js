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
    log.error = {}
    if (typeof error === 'string')
      log.error.message = error
    else {
      log.error.message = error.message
    }
    console.log(JSON.stringify(log))
    const logDB = await Log.create({ date: new Date(), description: JSON.stringify(log) })
    res.status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Ocorreu um erro interno. Nos envie uma solicitação com o código ${logDB.id}` })
  }
}

export const asyncErrorHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    handlerError(err, res, req)
  })
}


export const questionErros = {
  HAS_DESCRIPTION: 'Descrição inválida.',
  HAS_CATEGORY: 'A questão deve ter uma área.',
  HAS_FOUR_ANSWERS: 'A questão deve ter 4 respostas.',
  BETWEEN_POINTS: 'Os pontos devem estar entre 1 and 10.',
  SYNC_NO_UPDATED_DATE: 'Questão sem data de atualização'
}

export const answerErros = {
  HAS_CLASSIFICATION: 'Todas as respostas devem possuir uma classificação.',
  HAS_DESCRIPTION: 'A questão possui respostas sem descrição.',
  HAS_CORRECT_ANSWER: 'A questão deve possuir 1 resposta correta.',
  HAS_CLASSIFICATION_NEEDED: 'As respostas não possuem as classificações necessárias.',
  NO_ANSWER_REPEATED: 'Existem respostas repetidas.'
}