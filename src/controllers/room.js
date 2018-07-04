import db from '../infra/db/models/index'
import { throwForbiddenError, throwValidationError } from '../helpers/error'

const { Room, RoomUser, RoomQuestion, User, Question } = db

const toMy = (rooms) => {
  return rooms.map(p => ({
    id: p.id,
    name: p.name,
    secondsStep: p.secondsStep,
    createdAt: p.createdAt,
    endedAt: p.endedAt,
    userId: p.userId,
    users: p.RoomUsers.map(x => ({
      roomUserId: x.id,
      userId: x.userId,
      accepted: x.accepted,
      name: x.User.name,
      email: x.User.email
    })),
    questions: p.RoomQuestions.map(x => ({
      id: x.Question.id,
      description: x.Question.description,
      points: x.Question.points,
      shared: x.Question.shared,
      category: x.Question.category,
      sync: x.Question.sync,
      createdAt: x.Question.createdAt,
      updatedAt: x.Question.updatedAt,
      order: x.order
    }))
  }))
}

const toMyAssoc = (rooms) => {
  return rooms.map(p => ({
    id: p.id,
    name: p.name,
    secondsStep: p.secondsStep,
    createdAt: p.createdAt,
    endedAt: p.endedAt,
    score: p.RoomUsers[0].score
  }))
}

export default {

  getMy: async (req, res) => {
    const rooms = await Room.findAll({
      where: { userId: req.claims.id },
      include: [
        { model: RoomUser, include: [{ model: User }] },
        { model: RoomQuestion, include: [{ model: Question }] }
      ]
    })
    res.json(toMy(rooms))
  },

  getMyAssociated: async (req, res) => {
    const rooms = await Room.findAll({
      include: [{
        model: RoomUser,
        where: { userId: req.claims.id }
      }]
    })
    res.json(toMyAssoc(rooms))
  },

  getAvaliables: async (req, res) => {
    const rooms = await Room.findAll({ where: { endedAt: null } })
    res.json(rooms)
  },

  create: async (req, res) => {
    const { name, secondsStep } = req.body
    if (!name)
      throwValidationError('A sala deve ter um nome.')
    const room = {
      name: name,
      secondsStep: secondsStep || 0,
      userId: req.claims.id
    }
    const created = await Room.create(room)
    res.json({ room: created, message: 'Sala criada com sucesso.' })
  },

  remove: async (req, res) => {
    const { id } = req.params
    const room = await Room.findOne({ where: { id: id } })
    if (!room)
      throwValidationError('A sala não existe.')
    if (room.userId != req.claims.id)
      throwForbiddenError('Usuário sem permissão para remover o item.')
    await RoomUser.destroy({ where: { roomId: id } })
    await RoomQuestion.destroy({ where: { roomId: id } })
    await Room.destroy({ where: { id: id } })
    res.json({ message: 'Sala removida com sucesso.' })
  },

  enter: async (req, res) => {
    const { id } = req.params
    const room = await Room.findOne({
      include: [{ model: RoomUser }],
      where: { id: id }
    })
    if (!room)
      throwValidationError('A sala não existe.')
    else if (room.RoomUsers.filter(p => p.userId === req.claims.id).length > 0)
      throwValidationError('Usuário já incluso na sala.')
    await RoomUser.create({ roomId: id, userId: req.claims.id })
    res.json({ message: 'Entrou na sala.' })
  },

  update: async (req, res) => {
    const { questions, roomId, name, secondsStep } = req.body
    const questionIds = questions.map(p => p.id)
    if (!name)
      throwValidationError('Informe o nome da sala.')

    if (!roomId)
      throwValidationError('Informe a sala.')

    if (!questionIds || !Array.isArray(questionIds) || questionIds.length == 0)
      throwValidationError('Informe as questões.')

    const questionsDb = await Question.findAll({ where: { id: questionIds } })
    const questionsIdsDb = questionsDb.map(p => p.id)
    if (questionIds.filter(p => questionsIdsDb.indexOf(p) === -1).length > 0)
      throwValidationError('Há questões informadas que não existem.')

    if (questionsDb.filter(p => p.userId !== req.claims.id).length > 0)
      throwValidationError('Há questões informadas que não pertencem ao usuário.')

    const room = await Room.findOne({
      include: [{ model: RoomQuestion }],
      where: { id: roomId }
    })

    if (!room)
      throwValidationError('A sala não existe.')

    if (room.userId !== req.claims.id)
      throwValidationError('A sala informada não pertence ao usuário.')

    const alreadySelectedIds = room.RoomQuestions.map(p => p.questionId)
    const pendingQuestionIds = questionIds.filter(p => alreadySelectedIds.indexOf(p) === -1)
    for (let i = 0; i < pendingQuestionIds.length; i++) {
      const q = questions.filter(p => p.id === pendingQuestionIds[i]).shift()
      await RoomQuestion.create({
        roomId: roomId,
        questionId: q.id,
        order: q.order || 0
      })
    }
    await Room.update(
      { name: name, secondsStep: secondsStep || 30 },
      { where: { id: roomId } }
    )

    res.json({
      message: 'Questões adicionadas com sucesso.'
    })
  }
}