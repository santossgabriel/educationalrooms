import {
  throwValidationError,
  throwForbiddenError,
  answerErros,
  questionErros
} from '../helpers/error'
import db from '../infra/db/models/index'
import { isMobile } from './account'

export const questionStatus = {
  NEW: 'N',
  UPDATED: 'U',
  REMOVED: 'R'
}

const questionToDb = (q) => {
  return {
    category: q.category,
    description: q.description,
    points: q.points,
    shared: q.shared,
    sync: q.sync,
    updatedAt: q.updatedAt
  }
}

const { sequelize, Question, Answer } = db

const validateAnswers = (answers) => {
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

  if (classifications.filter((v, i, arr) => arr.indexOf(v) === i).length != 4)
    throwValidationError(answerErros.HAS_CLASSIFICATION_NEEDED)

  if (descriptions.filter((v, i, arr) => arr.indexOf(v) === i).length != 4)
    throwValidationError(answerErros.NO_ANSWER_REPEATED)
}

const validateQuestion = (question) => {

  if (!question || !question.description)
    throwValidationError(questionErros.HAS_DESCRIPTION)

  const { points, answers, category } = question

  if (!category)
    throwValidationError(questionErros.HAS_CATEGORY)

  if (isNaN(points) || points < 1 || points > 10)
    throwValidationError(questionErros.BETWEEN_POINTS)

  if (!Array.isArray(question.answers) || question.answers.length != 4)
    throwValidationError(questionErros.HAS_FOUR_ANSWERS)

  validateAnswers(answers)
}

const toResult = (questions) => {
  if (Array.isArray(questions))
    return questions.map(q => toResult(q))
  else
    return {
      id: questions.id,
      description: questions.description,
      category: questions.category,
      points: questions.points,
      answers: questions.Answers,
      shared: questions.shared,
      userId: questions.userId
    }
}

export default {

  getById: async (req, res) => {
    const { id } = req.params
    const question = await Question.findOne({ include: Answer, where: { id: id } })
    res.json(toResult(question))
  },

  getMy: async (req, res) => {
    const questions = await Question.findAll({
      include: { model: Answer },
      where: sequelize.and(
        { userId: req.claims.id },
        { sync: { [sequelize.Op.ne]: questionStatus.REMOVED } },
      ),
      order: [[Answer, 'classification']]
    })
    res.json(toResult(questions))
  },

  getOthers: async (req, res) => {
    const questions = await Question.findAll({
      include: Answer,
      where: sequelize.and(
        { userId: { [sequelize.Op.ne]: req.claims.id } },
        { sync: { [sequelize.Op.ne]: questionStatus.REMOVED } },
        { shared: true }
      )
    })
    res.json(toResult(questions))
  },

  getMyCategories: async (req, res) => {
    const categories = await Question.findAll({
      attributes: ['category'],
      where: { userId: req.claims.id },
      group: ['category'],
      order: sequelize.literal('count(1) desc')
    })
    res.json(categories.map(p => p.category))
  },

  create: async (req, res) => {
    let question = {}
    const transaction = await sequelize.transaction()
    try {

      question.id = req.body.id
      question.category = req.body.category
      question.description = req.body.description
      question.points = req.body.points
      question.shared = req.body.shared
      question.answers = req.body.answers
      question.userId = req.claims.id

      validateQuestion(question)
      question.sync = questionStatus.NEW
      question.createdAt = new Date()
      question.updatedAt = new Date()
      const questionDB = await Question.create(question, { transaction: transaction })
      const { answers } = question
      for (let i = 0; i < answers.length; i++) {
        answers[i].questionId = questionDB.id
        await Answer.create(answers[i], { transaction: transaction })
      }
      transaction.commit()
      res.json({ message: 'Criado com sucesso.' })
    } catch (ex) {
      transaction.rollback()
      throw ex
    }
  },

  update: async (req, res) => {
    let question = {}
    let transaction = await sequelize.transaction()
    try {

      question.id = req.body.id
      question.category = req.body.category
      question.description = req.body.description
      question.points = req.body.points
      question.shared = req.body.shared
      question.answers = req.body.answers

      const questionDb = await Question.findOne({ include: Answer, where: { id: question.id } })

      if (questionDb.userId != req.claims.id)
        throwForbiddenError('Usuário sem permissão para alterar o item.')

      validateQuestion(question)

      question.userId = req.claims.id
      question.updatedAt = new Date()

      question.sync = isMobile(req.claims.id) ? questionStatus.UPDATED : ''

      await Question.update(question, {
        where: { id: question.id },
        transaction: transaction
      })
      const { answers } = question
      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i]
        answer.questionId = question.id
        await Answer.update(answer, {
          where: { id: answer.id },
          transaction: transaction
        })
      }
      transaction.commit()
      res.json({ message: 'Atualizado com sucesso.' })
    } catch (ex) {
      if (transaction)
        transaction.rollback()
      throw ex
    }
  },

  remove: async (req, res) => {
    const { id } = req.params
    const transaction = await sequelize.transaction()
    try {
      const question = await Question.findOne({ where: { id: id } })
      if (!question)
        throwValidationError('A questão não existe.')
      if (question.userId != req.claims.id)
        throwForbiddenError('Usuário sem permissão para remover o item.')

      if (isMobile(req.claims.id)) {
        await Question.update(
          { sync: questionStatus.REMOVED },
          { where: { id: id }, transaction: transaction }
        )
      } else {
        await Answer.destroy({ where: { questionId: id }, transaction: transaction })
        await Question.destroy({ where: { id: id }, transaction: transaction })
      }

      transaction.commit()
      res.json({ message: 'Questão removida com sucesso.' })
    } catch (ex) {
      transaction.rollback()
      throw ex
    }
  },

  share: async (req, res) => {
    const question = req.body
    const questionDb = await Question.findOne({ where: { id: question.id } })

    if (!questionDb)
      throwValidationError('A questão não existe.')

    if (questionDb.userId != req.claims.id)
      throwForbiddenError('Usuário sem permissão para alterar o item.')

    await Question.update({ shared: question.shared }, {
      where: { id: question.id }
    })
    res.json({ message: 'Compartilhada com sucesso.' })
  },

  sync: async (req, res) => {

    if (!req.body || !req.body.questions || !Array.isArray(req.body.questions))
      throwValidationError('Informe as questões para sincronização.')

    const appQuestions = req.body.questions.map(p => {
      p.sync = p.sync ? p.sync : ''
      return p
    })
    let errors = []
    let i

    const appChangesIds = appQuestions.filter(t => t.id > 0).map(p => p.id)
    const news = appQuestions.filter(t => !t.id)

    const dbChanges = await Question.findAll({
      include: Answer,
      where: sequelize.and(
        { userId: req.claims.id },
        sequelize.or(
          { sync: { [sequelize.Op.ne]: '' } },
          { id: appChangesIds }))
    })

    const dbUpdates = dbChanges.filter(p => appChangesIds.indexOf(p.id) !== -1)

    for (i = 0; i < dbUpdates.length; i++) {
      const q = dbUpdates[i]
      const mq = appQuestions.filter(p => p.id == q.id).shift()

      const transaction = await sequelize.transaction()

      try {
        if (!mq.updatedAt)
          throwValidationError(questionErros.SYNC_NO_UPDATED_DATE)
        mq.updatedAt = new Date(mq.updatedAt)
        if (!q.updatedAt || (mq.updatedAt > new Date(q.updatedAt.toString()))) {
          if (mq.sync === 'R') {
            await Answer.destroy({ where: { questionId: q.id }, transaction: transaction })
            await Question.destroy({ where: { id: q.id }, transaction: transaction })
          } else {
            validateQuestion(mq)
            await Question.update(questionToDb(mq), {
              where: { id: mq.id },
              transaction: transaction
            })
            const { answers } = mq
            for (let i = 0; i < answers.length; i++) {
              let answer = answers[i]
              answer.questionId = mq.id
              await Answer.update(answer, {
                where: { id: answer.id },
                transaction: transaction
              })
            }
          }
        } else {
          if (q.sync === 'R') {
            await Answer.destroy({ where: { questionId: q.id }, transaction: transaction })
            await Question.destroy({ where: { id: q.id }, transaction: transaction })
          }
        }

        transaction.commit()
      } catch (ex) {
        transaction.rollback()
        errors.push({
          exception: typeof (ex) === 'string' ? ex : ex.message,
          question: mq,
          message: 'Erro ao atualizar questão'
        })
      }
    }

    for (i = 0; i < news.length; i++) {
      let q = news[i]
      const transaction = await sequelize.transaction()
      try {
        q.userId = req.claims.id
        validateQuestion(q)
        q.sync = ''
        const questionDB = await Question.create(q, { transaction: transaction })
        const { answers } = q
        for (let i = 0; i < answers.length; i++) {
          answers[i].questionId = questionDB.id
          await Answer.create(answers[i], { transaction: transaction })
        }
        transaction.commit()
      } catch (ex) {
        transaction.rollback()
        errors.push({
          exception: typeof (ex) === 'string' ? ex : ex.message,
          question: q,
          message: 'Erro ao criar questão'
        })
      }
    }

    Question.update({ sync: '' }, { where: { userId: req.claims.id } })

    const questionsResult = await Question.findAll({
      include: Answer,
      where: { userId: req.claims.id }
    })

    res.json({ errors: errors, questions: questionsResult })
  }
}