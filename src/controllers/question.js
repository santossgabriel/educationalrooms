import { throwValidationError, handlerError } from '../helpers/error'

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

class QuestionController {
  create(req, res) {
    const question = req.body
    try {
      validate(question)
      res.json({ message: 'Criado com sucesso.' })
    } catch (ex) {
      handlerError(ex, res)
    }
  }

  update(req, res) {
    const question = req.body
    try {
      validate(question)
      res.json({ message: 'Atualizado com sucesso.' })
    } catch (ex) {
      handlerError(ex, res)
    }
  }
}

export default new QuestionController()