import { throwValidationError, handlerError } from '../helpers/error'
// import { Question, Answer } from '../infra/db/sequelize'

import db from '../infra/db/models/index'

const { sequelize, Question, Answer } = db

const validate = (question) => {

  if (!question || !question.description)
    throwValidationError('Descrição inválida.')

  const { points, answers } = question

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

  getById: async (req, res) => {
    const { id } = req.params
    res.json(await Question.findOne({ include: Answer, where: { id: id } }))
  },

  getMy: async (req, res) => {
    res.json(await Question.findAll({ include: Answer, where: { userId: req.claims.id } }))
  },

  getAll: async (req, res) => {
    res.json(await Question.findAll({
      include: Answer,
      where: sequelize.or(
        { userId: req.claims.id },
        { shared: true }
      )
    }))
  },

  create: async (req, res) => {
    const question = req.body
    const transaction = await sequelize.transaction()
    try {
      question.userId = req.claims.id
      validate(question)
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
      handlerError(ex, res, req)
    }
  },

  update: async (req, res) => {
    const question = req.body
    const transaction = await sequelize.transaction()
    try {
      if (question.userId != req.claims.id)
        throwValidationError('Usuário sem permissão para alterar o item.')
      validate(question)
      await Question.update(question, {
        where: { id: question.id },
        transaction: transaction
      })
      const { answers } = question
      for (let i = 0; i < answers.length; i++)
        await Answer.update(answers[i], {
          where: { id: answers[i].id },
          transaction: transaction
        })
      transaction.commit()
      res.json({ message: 'Atualizado com sucesso.' })
    } catch (ex) {
      transaction.rollback()
      handlerError(ex, res, req)
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
        throwValidationError('Usuário sem permissão para remover o item.')

      await Answer.destroy({ where: { questionId: id }, transaction: transaction })
      await Question.destroy({ where: { id: id }, transaction: transaction })

      transaction.commit()
      res.json({ message: 'Questão removida com sucesso.' })
    } catch (ex) {
      transaction.rollback()
      handlerError(ex, res, req)
    }
  }
}