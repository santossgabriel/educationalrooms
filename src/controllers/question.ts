import {
  throwValidationError,
  throwForbiddenError,
  questionErros
} from '../helpers/error'
import db from '../infra/db/models/index'
import { Languages } from '../helpers/utils'
import { questionToResult, questionToExportResult } from '../mappers'
import { validateQuestion } from '../validators'
import { Op } from 'sequelize'
import { AppRequest, AppResponse } from '../models/app.model'

export const questionStatus = {
  NEW: 'N',
  UPDATED: 'U',
  REMOVED: 'R'
}

const { sequelize, Question, Answer, RoomQuestion, Room } = db
const { EN, BR } = Languages

export default {

  getById: async (req: AppRequest, res: AppResponse) => {
    const { id } = req.params
    const question = await Question.findOne({ include: Answer, where: { id } })
    res.json(questionToResult(question))
  },

  getMy: async (req: AppRequest, res: AppResponse) => {
    const questions = await Question.findAll({
      include: { model: Answer },
      where: sequelize.and(
        { userId: req.claims.id },
        { sync: { [Op.ne]: questionStatus.REMOVED } },
      ),
      order: [[Answer, 'classification']]
    })
    res.json(questionToResult(questions))
  },

  getOthers: async (req: AppRequest, res: AppResponse) => {
    const addedIds = (await Question.findAll({
      attributes: ['sharedQuestionId'],
      where: sequelize.and(
        { userId: req.claims.id },
        { sharedQuestionId: { [Op.ne]: null } }
      )
    })).map((p: any) => p.sharedQuestionId)

    const questions = await Question.findAll({
      include: Answer,
      where: sequelize.and(
        { userId: { [Op.ne]: req.claims.id } },
        addedIds.length > 0 ? { id: { [Op.notIn]: addedIds } } : null,
        { shared: true }
      )
    })
    res.json(questionToResult(questions))
  },

  getAreas: async (req: AppRequest, res: AppResponse) => {
    const areas = await Question.findAll({
      attributes: ['area'],
      group: ['area'],
      order: sequelize.literal('count(1) desc')
    })
    res.json(areas.map((p: any) => p.area))
  },

  create: async (req: AppRequest, res: AppResponse) => {
    const question: any = {}
    const transaction = await sequelize.transaction()
    try {

      question.id = req.body.id
      question.difficulty = req.body.difficulty
      question.area = (req.body.area || '').toUpperCase()
      question.description = req.body.description
      question.shared = req.body.shared
      question.answers = req.body.answers
      question.userId = req.claims.id

      validateQuestion(question)
      question.sync = questionStatus.NEW
      question.createdAt = new Date()
      question.updatedAt = new Date()
      const questionDB = await Question.create(question, { transaction })
      const { answers } = question
      for (const answer of answers) {
        answer.questionId = questionDB.id
        await Answer.create(answer, { transaction })
      }
      transaction.commit()
      res.json({ message: { [BR]: 'Criado com sucesso.', [EN]: 'Created successfully.' } })
    } catch (ex) {
      transaction.rollback()
      throw ex
    }
  },

  update: async (req: AppRequest, res: AppResponse) => {
    const question: any = {}
    const transaction = await sequelize.transaction()
    try {

      question.id = req.body.id
      question.difficulty = req.body.difficulty
      question.area = (req.body.area || '').toUpperCase()
      question.description = req.body.description
      question.shared = req.body.shared
      question.answers = req.body.answers

      const questionDb = await Question.findOne({ include: Answer, where: { id: question.id } })

      if (!questionDb)
        throwForbiddenError(questionErros.NOT_FOUND)

      if (questionDb.userId !== req.claims.id)
        throwForbiddenError(questionErros.NOT_ALLOWED_CHANGE)

      validateQuestion(question)

      question.userId = req.claims.id
      question.updatedAt = new Date()

      const roomQuestion = await Room.findOne({
        include: [{
          model: RoomQuestion,
          required: true,
          where: { questionId: question.id }
        }],
        where: { startedAt: { [Op.ne]: null } }
      })

      if (roomQuestion)
        throwForbiddenError(questionErros.IN_ROOM_EDIT)

      await Question.update(question, { where: { id: question.id }, transaction })

      await Answer.destroy({ where: { questionId: question.id }, transaction })

      const { answers } = question

      for (const answer of answers)
        await Answer.create({
          correct: answer.correct,
          description: answer.description,
          questionId: question.id,
          classification: answer.classification
        }, { transaction })
      transaction.commit()
      res.json({ message: { [BR]: 'Atualizada com sucesso.', [EN]: 'Updated successfully.' } })
    } catch (ex) {
      if (transaction)
        transaction.rollback()
      throw ex
    }
  },

  remove: async (req: AppRequest, res: AppResponse) => {
    const { id } = req.params
    const transaction = await sequelize.transaction()
    try {
      const question = await Question.findOne({ where: { id } })
      if (!question)
        throwValidationError(questionErros.NOT_FOUND)
      if (question.userId !== req.claims.id)
        throwForbiddenError(questionErros.NOT_ALLOWED_REMOVE)

      const roomQuestion = await RoomQuestion.findOne({ where: { questionId: id } })

      if (roomQuestion)
        throwValidationError(questionErros.IN_ROOM_REMOVE)

      await Answer.destroy({ where: { questionId: id }, transaction })
      await Question.destroy({ where: { id }, transaction })

      transaction.commit()
      res.json({
        message: {
          [EN]: 'Question removed successfully.',
          [BR]: 'Questão removida com sucesso.'
        }
      })
    } catch (ex) {
      transaction.rollback()
      throw ex
    }
  },

  share: async (req: AppRequest, res: AppResponse) => {
    const question = req.body
    const questionDb = await Question.findOne({ where: { id: question.id } })

    if (!questionDb)
      throwValidationError(questionErros.NOT_FOUND)

    if (questionDb.userId !== req.claims.id)
      throwForbiddenError(questionErros.NOT_ALLOWED_CHANGE)

    await Question.update({ shared: question.shared }, {
      where: { id: question.id }
    })

    res.json({
      message: {
        [EN]: 'Shared successfully.',
        [BR]: 'Compartilhada com sucesso.'
      }
    })
  },

  getShared: async (req: AppRequest, res: AppResponse) => {
    const { id } = req.params
    const questionDb = await Question.findOne({
      where: { id, shared: true },
      include: [{ model: Answer }]
    })

    if (!questionDb)
      throwValidationError(questionErros.NOT_EXIST_OR_NOT_SHARED)

    const already = await Question.findOne({
      where: { sharedQuestionId: id }
    })

    if (already)
      throwValidationError(questionErros.QUESTION_ALREADY_ADDED)

    const q = {
      description: questionDb.description,
      userId: req.claims.id,
      shared: false,
      area: questionDb.area,
      difficulty: questionDb.difficulty,
      createdAt: questionDb.createdAt,
      updatedAt: questionDb.updatedAt,
      sharedQuestionId: questionDb.id
    }

    const transaction = await sequelize.transaction()
    try {
      const added = await Question.create(q, { transaction })
      for (const answer of questionDb.Answers) {
        const a = {
          description: answer.description,
          correct: answer.correct,
          questionId: added.id,
          classification: answer.classification
        }
        await Answer.create(a, { transaction })
      }
      transaction.commit()
      res.json({
        message: {
          [EN]: 'Question acquired successfully.',
          [BR]: 'Questão adquirida com sucesso.'
        }
      })
    } catch (ex) {
      transaction.rollback()
      throw ex
    }
  },

  exportMyQuestions: async (req: AppRequest, res: AppResponse) => {
    const questions = await Question.findAll({ include: Answer, where: { userId: req.claims.id } })
    res.set('Content-Disposition', 'attachment; filename=questions.json')
    res.end(JSON.stringify(questionToExportResult(questions)))
  }
}