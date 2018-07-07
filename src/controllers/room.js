import db from '../infra/db/models/index'
import { throwForbiddenError, throwValidationError } from '../helpers/error'
import { questionStatus } from './question'

const { Room, RoomUser, RoomQuestion, User, Question, sequelize } = db

const toMy = (p) => {
  return {
    id: p.id,
    name: p.name,
    time: p.time,
    createdAt: p.createdAt,
    endedAt: p.endedAt,
    openedAt: p.openedAt,
    startedAt: p.startedAt,
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
    })).filter(p => p.sync !== questionStatus.REMOVED)
  }
}

const toMyAssoc = (rooms) => {
  return rooms.map(p => ({
    id: p.id,
    name: p.name,
    time: p.time,
    createdAt: p.createdAt,
    startedAt: p.startedAt,
    openedAt: p.openedAt,
    endedAt: p.endedAt,
    score: p.RoomUsers[0].score,
    status: getStatusRoom(p)
  }))
}

const getStatusRoom = (room) => {
  if (room.endedAt)
    return 'FINALIZADA'
  if (room.startedAt)
    return 'INICIADA'
  if (room.openedAt)
    return 'ABERTA'
  return 'FECHADA'
}

const toOpened = (room, userId) => {
  return {
    id: room.id,
    name: room.name,
    time: room.time,
    createdAt: room.createdAt,
    openedAt: room.openedAt,
    users: room.RoomUsers.length,
    questions: room.RoomQuestions.length,
    owner: room.User.name,
    associate: room.RoomUsers.filter(p => p.userId === userId).length > 0
  }
}

export default {

  get: async (req, res) => {
    const room = await Room.findOne({
      where: { userId: req.claims.id, id: req.params.id },
      include: [
        { model: RoomUser, include: [{ model: User }] },
        { model: RoomQuestion, include: [{ model: Question }] }
      ]
    })
    res.json(toMy(room))
  },

  getMy: async (req, res) => {
    const rooms = await Room.findAll({
      where: { userId: req.claims.id },
      include: [
        { model: RoomUser, include: [{ model: User }] },
        { model: RoomQuestion, include: [{ model: Question }] }
      ]
    })
    res.json(rooms.map(p => toMy(p)))
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

  getOpened: async (req, res) => {
    const rooms = await Room.findAll({
      include: [
        { model: RoomUser },
        { model: User },
        { model: RoomQuestion }
      ],
      where: {
        openedAt: { [sequelize.Op.ne]: null },
        startedAt: null
      }
    })
    res.json(rooms.map(p => toOpened(p, req.claims.id)))
  },

  remove: async (req, res) => {
    const { id } = req.params
    const room = await Room.findOne({ where: { id: id } })
    if (!room)
      throwValidationError('A sala não existe.')
    if (room.userId != req.claims.id)
      throwForbiddenError('Usuário sem permissão para remover o item.')
    if (room.startedAt && !room.endedAt)
      throwValidationError('Uma sala iniciada que não finalizou não pode ser removida.')
    await RoomUser.destroy({ where: { roomId: id } })
    await RoomQuestion.destroy({ where: { roomId: id } })
    await Room.destroy({ where: { id: id } })
    res.json({ message: 'Sala removida com sucesso.' })
  },

  associate: async (req, res) => {
    const { id, associate } = req.body
    const room = await Room.findOne({
      include: [{ model: RoomUser }],
      where: { id: id }
    })
    if (!room)
      throwValidationError('A sala não existe.')

    const associated = room.RoomUsers.filter(p => p.userId === req.claims.id).length > 0

    if (associate) {
      if (associated)
        throwValidationError('Usuário já incluso na sala.')
      if (!room.openedAt || room.startedAt)
        throwValidationError('Sala não foi aberta ou já foi finalizada.')
      await RoomUser.create({ roomId: id, userId: req.claims.id })
      res.json({ message: 'Entrou na sala.' })
    } else {
      if (!associated)
        throwValidationError('Usuário não incluso na sala.')
      await RoomUser.destroy({ where: { roomId: id, userId: req.claims.id } })
      res.json({ message: 'Saiu da sala.' })
    }
  },

  save: async (req, res) => {
    const { questions, id, name, time } = req.body
    const questionIds = Array.isArray(questions) ? questions.map(p => p.id) : []

    if (!name)
      throwValidationError('Informe o nome da sala.')

    const questionsDb = await Question.findAll({ where: { id: questionIds } })
    const questionsIdsDb = questionsDb.map(p => p.id)
    if (questionIds.filter(p => questionsIdsDb.indexOf(p) === -1).length > 0)
      throwValidationError('Há questões informadas que não existem.')

    if (questionsDb.filter(p => p.userId !== req.claims.id).length > 0)
      throwValidationError('Há questões informadas que não pertencem ao usuário.')

    let room = null
    let msgResult = ''

    if (id > 0) {

      room = await Room.findOne({
        include: [{ model: RoomQuestion }],
        where: { id: id }
      })

      if (!room)
        throwValidationError('A sala não existe.')

      if (room.userId !== req.claims.id)
        throwValidationError('A sala informada não pertence ao usuário.')

      await Room.update(
        { name: name, time: time },
        { where: { id: id } }
      )

      msgResult = 'Sala atualizada com sucesso.'

    } else {
      room = {
        name: name,
        time: time,
        userId: req.claims.id
      }
      room = await Room.create(room)
      msgResult = 'Sala criada com sucesso.'
    }

    await RoomQuestion.destroy({ where: { roomId: id } })

    for (let i = 0; i < questionIds.length; i++) {
      const q = questions.filter(p => p.id === questionIds[i]).shift()
      await RoomQuestion.create({
        roomId: id || room.id,
        questionId: q.id,
        order: q.order || 0
      })
    }

    res.json({ message: msgResult })
  }
}