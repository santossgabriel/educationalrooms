import httpStatus from 'http-status'
import sequelize from '../infra/db/models/index'
import { Languages } from './utils'

const { Log } = sequelize
const { EN, BR } = Languages

export const throwValidationError = (message) => {
  throw { status: httpStatus.UNPROCESSABLE_ENTITY, error: message }
}

export const throwAuthError = (message) => {
  throw { status: httpStatus.UNAUTHORIZED, error: message }
}

export const throwForbiddenError = (message) => {
  throw { status: httpStatus.FORBIDDEN, error: message }
}

export const authError = (err, res, req) => {
  let msg = null
  if (typeof err === 'string') msg = { [EN]: err, [BR]: err }
  else if (err[EN] && err[BR]) msg = err
  else if (err && err.message === 'jwt expired') msg = { [EN]: 'Token expired.', [BR]: 'Token expirou.' }
  else msg = { [EN]: 'Not authorized', [BR]: 'Não autorizado.' }
  handlerError({ status: httpStatus.UNAUTHORIZED, error: msg }, res, req)
}

const requestToLog = request => {
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
    res.status(error.status).json({ message: error.error })
  } else {
    let log = requestToLog(req)
    log.error = {}
    if (typeof error === 'string')
      log.error.message = error
    else {
      log.error.message = error.message
    }
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
  HAS_DESCRIPTION: {
    [BR]: 'Descrição inválida.',
    [EN]: 'Invalid description.'
  },
  HAS_AREA: {
    [BR]: 'A questão deve ter uma área.',
    [EN]: 'The question should have an area.'
  },
  HAS_BETWEEN_ANSWERS: {
    [BR]: 'A questão deve ter entre 2 e 6 respostas.',
    [EN]: 'The question must be between 2 and 6 answers.'
  },
  INVALID_DIFFICULTY: {
    [BR]: 'A dificuldade deve estar entre 1 e 5.',
    [EN]: 'The difficulty must be between 1 and 5.'
  },
  NOT_FOUND: {
    [BR]: 'A questão não foi encontrada.',
    [EN]: 'The question was not found.'
  },
  NOT_ALLOWED_CHANGE: {
    [BR]: 'Sem permissão para alterar esta questão.',
    [EN]: 'Not allowed to change this question.'
  },
  NOT_ALLOWED_REMOVE: {
    [BR]: 'Sem permissão para remover esta questão.',
    [EN]: 'Not allowed to remove this question.'
  },
  IN_ROOM_EDIT: {
    [BR]: 'A questão pertence à uma sala que já foi iniciada ou finalizada e não pode ser editada.',
    [EN]: 'The question belongs to a room that has already been started or finished and can not be edited.'
  },
  IN_ROOM_REMOVE: {
    [BR]: 'A questão pertence à uma sala que já foi iniciada ou finalizada e não pode ser removida.',
    [EN]: 'The question belongs to a room that has already been started or finished and can not be removed.'
  },
  NOT_EXIST_OR_NOT_SHARED: {
    [EN]: 'The question does not exist or is not shared.',
    [BR]: 'A questão não existe ou não está compartilhada.'
  },
  QUESTION_ALREADY_ADDED: {
    [EN]: 'This question has already been added ',
    [BR]: 'Essa questão já foi adicionada.'
  }
}

export const answerErros = {
  HAS_CLASSIFICATION: {
    [BR]: 'Todas as respostas devem possuir uma classificação.',
    [EN]: 'All anwers most '
  },
  HAS_DESCRIPTION: {
    [BR]: 'A questão possui respostas sem descrição.',
    [EN]: 'The question has answers without description.'
  },
  HAS_CORRECT_ANSWER: {
    [BR]: 'A questão deve possuir 1 e apenas 1 resposta correta.',
    [EN]: 'The question must have one and only one correct answer.'
  },
  HAS_CLASSIFICATION_NEEDED: {
    [BR]: 'As respostas não possuem as classificações necessárias.',
    [EN]: 'The answers do not have the necessary classifications.'
  },
  NO_ANSWER_REPEATED: {
    [BR]: 'Existem respostas repetidas.',
    [EN]: 'There are repeated answers.'
  }
}