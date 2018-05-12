import { throwValidationError, handlerError } from '../helpers/error'
import { Question } from '../infra/db/sequelize'

const validate = (question) => {

  if (!question)
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

  getByUser: (req, res) => {
    res.json([{ id: 1 }, { id: 2 }, { id: 3 }])
  },

  create: (req, res) => {
    const question = req.body
    try {
      question.userId = req.claims.id
      validate(question)
      Question.create(question)
        .then(() => res.json({ message: 'Criado com sucesso.' }))
        .catch(err => { throw err })
    } catch (ex) {
      handlerError(ex, res)
    }
  },

  update: (req, res) => {
    const question = req.body
    try {
      question.userId = req.claims.id
      validate(question)
      res.json({ message: 'Atualizado com sucesso.' })
    } catch (ex) {
      handlerError(ex, res)
    }
  }
}