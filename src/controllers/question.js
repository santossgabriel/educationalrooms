import { throwValidationError, throwForbiddenError } from '../helpers/error'

import db from '../infra/db/models/index'

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
      throwValidationError('Todas as respostas devem possuir uma classificação.')

    if (!answer.description)
      throwValidationError('A questão possui respostas sem descrição.')

    classifications.push(answer.classification)
    descriptions.push(answer.description)
  }

  if (corrects != 1)
    throwValidationError('A questão deve possuir 1 resposta correta.')

  if (classifications.filter((v, i, arr) => arr.indexOf(v) === i).length != 4)
    throwValidationError('As respostas não possuem as classificações necessárias.')

  if (descriptions.filter((v, i, arr) => arr.indexOf(v) === i).length != 4)
    throwValidationError('Existem respostas repetidas.')
}

const validateQuestion = (question) => {

  if (!question || !question.description)
    throwValidationError('Descrição inválida.')

  const { points, answers, category } = question

  if (!category)
    throwValidationError('A questão deve ter uma área.')
  if (!Array.isArray(question.answers) || question.answers.length != 4)
    throwValidationError('A questão deve ter 4 respostas.')
  if (isNaN(points) || points < 1 || points > 10)
    throwValidationError('Os pontos devem estar entre 1 and 10.')
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
      where: { userId: req.claims.id },
      order: [[Answer, 'classification']]
    })
    res.json(toResult(questions))
  },

  getOthers: async (req, res) => {
    const questions = await Question.findAll({
      include: Answer,
      where: sequelize.and(
        { userId: { [sequelize.Op.ne]: req.claims.id } },
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
    const question = req.body
    const transaction = await sequelize.transaction()
    try {
      question.userId = req.claims.id
      validateQuestion(question)
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
    const question = req.body
    let transaction = await sequelize.transaction()
    try {
      const questionDb = await Question.findOne({ include: Answer, where: { id: question.id } })

      if (questionDb.userId != req.claims.id)
        throwForbiddenError('Usuário sem permissão para alterar o item.')

      validateQuestion(question)

      question.userId = req.claims.id
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

      await Answer.destroy({ where: { questionId: id }, transaction: transaction })
      await Question.destroy({ where: { id: id }, transaction: transaction })

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
    console.log(req.body)
    res.json(req.body)
  }
}