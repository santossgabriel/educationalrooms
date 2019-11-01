import {
  throwValidationError,
  answerErros,
  questionErros
} from '../helpers/error'

export const validateAnswers = (answers) => {
  let corrects = 0
  let classifications = []
  let descriptions = []
  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i]
    if (answer.correct)
      corrects++

    if (!answer.classification || typeof answer.classification !== 'string')
      throwValidationError(answerErros.HAS_CLASSIFICATION)

    if (!answer.description)
      throwValidationError(answerErros.HAS_DESCRIPTION)

    classifications.push(answer.classification)
    descriptions.push(answer.description)
  }

  if (corrects != 1)
    throwValidationError(answerErros.HAS_CORRECT_ANSWER)

  if (classifications.filter((v, i, arr) => arr.indexOf(v) === i).length !== answers.length)
    throwValidationError(answerErros.HAS_CLASSIFICATION_NEEDED)

  if (descriptions.filter((v, i, arr) => arr.indexOf(v) === i).length !== answers.length)
    throwValidationError(answerErros.NO_ANSWER_REPEATED)
}

export const validateQuestion = (question) => {

  if (!question || !question.description)
    throwValidationError(questionErros.HAS_DESCRIPTION)

  const { answers, difficulty, area } = question

  if (!area)
    throwValidationError(questionErros.HAS_AREA)

  if (!difficulty || difficulty < 1 || difficulty > 5)
    throwValidationError(questionErros.INVALID_DIFFICULTY)

  if (!Array.isArray(question.answers) || question.answers.length < 2 || question.answers.length > 6)
    throwValidationError(questionErros.HAS_BETWEEN_ANSWERS)

  validateAnswers(answers)
}