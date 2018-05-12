import jwt from 'jsonwebtoken'

import { throwValidationError, handlerError, authError } from '../helpers/error'
import config from '../infra/config'
import { User } from '../infra/db/sequelize'

const validate = (question) => {

  if (!question || Object.keys(question).length == 0)
    throwValidationError('Questão inválida.')

  const { points, answers } = question

  if (!question.description)
    throwValidationError('Descrição inválida.')
  if (!Array.isArray(question.answers) || question.answers.length != 4)
    throwValidationError('A questão deve ter 4 respostas.')
  if (isNaN(points) || points < 1 || points > 10)
    throwValidationError('Os pontos devem estar entre 1 and 10.')
  let corrects = 0
  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i]
    if (answer.correct)
      corrects++
    if (!answer.description)
      throwValidationError('A questão possui respostas sem descrição.')
  }
  if (corrects != 1)
    throwValidationError('A questão deve possuir 1 resposta correta.')
}

export default {
  getData: (req, res) => {

  },

  getToken: (req, res) => {
    const { email, password } = req.body
    User.findOne({ where: { email: email } })
      .then(result => {
        if (result && result.password === password) {
          const token = jwt.sign({ id: result.id }, config.SECRET, { expiresIn: 60 * 60 * 24 })
          res.json({ token: token })
        }else{
          authError(res, 'Email ou senha inválidos.')
        }
      }).catch(err => handlerError(err, res))
  },

  create: (req, res) => {
    const account = req.body
    try {
    } catch (ex) {
      handlerError(ex, res)
    }
  },

  update: (req, res) => {
    const account = req.body
    try {
    } catch (ex) {
      handlerError(ex, res)
    }
  }
}