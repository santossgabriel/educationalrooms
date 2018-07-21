import db from '../infra/db/models/index'
import { throwForbiddenError, throwValidationError } from '../helpers/error'
import { questionStatus } from './question'
import { sendNotifications, updateOnlineRooms } from '../socket'

import { NotificationTypes } from './notification'

const {
  Room,
  RoomUser,
  RoomQuestion,
  User,
  Question,
  sequelize,
  OnlineRoom,
  RoomAnswer
} = db

export const roomStatus = {
  CLOSED: 'CLOSED',
  OPENED: 'OPENED',
  STARTED: 'STARTED',
  ENDED: 'ENDED',
}

const toMy = (p) => {
  return {
    id: p.id,
    name: p.name,
    time: p.time,
    createdAt: p.createdAt,
    endedAt: p.endedAt,
    openedAt: p.openedAt,
    startedAt: p.startedAt,
    status: getStatusRoom(p),
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
      points: x.points,
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
    return roomStatus.ENDED
  if (room.startedAt)
    return roomStatus.STARTED
  if (room.openedAt)
    return roomStatus.OPENED
  return roomStatus.CLOSED
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

  getQuiz: async (req, res) => {
    let room = await Room.findOne({
      where: {
        id: req.params.id,
        startedAt: { [sequelize.Op.ne]: null }
      },
      include: [
        {
          model: RoomUser,
          where: {
            userId: req.claims.id
          }
        }
      ]
    })

    if (!room)
      throwValidationError('Sala não disponível no momento')

    let score = 0
    if (room && room.endedAt) {
      const answers = await RoomAnswer.findAll({
        where: { roomId: req.params.id, userId: req.claims.id }
      })
      if (answers.length > 0)
        score = answers.map(p => p.score).reduce((x, y) => x + y)
    }

    res.json({
      createdAt: room.createdAt,
      endedAt: room.endedAt,
      id: room.id,
      name: room.name,
      openedAt: room.openedAt,
      startedAt: room.startedAt,
      time: room.time,
      score: score
    })
  },

  getMy: async (req, res) => {
    const rooms = await Room.findAll({
      where: { userId: req.claims.id },
      include: [
        { model: RoomUser, include: [{ model: User }] },
        { model: RoomQuestion, include: [{ model: Question }] }
      ],
      order: [
        ['endedAt', 'desc'],
        ['startedAt', 'desc'],
        ['openedAt', 'desc'],
        ['createdAt', 'desc']
      ]
    })
    res.json(rooms.map(p => toMy(p)))
  },

  getMyAssociated: async (req, res) => {
    const rooms = await Room.findAll({
      include: [{
        model: RoomUser,
        where: { userId: req.claims.id }
      }],
      order: [
        ['endedAt', 'desc'],
        ['startedAt', 'desc'],
        ['openedAt', 'desc'],
        ['createdAt', 'desc']
      ]
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
      order: [['openedAt', 'desc']],
      where: {
        openedAt: { [sequelize.Op.ne]: null },
        startedAt: null
      }
    })
    res.json(rooms.map(p => toOpened(p, req.claims.id)))
  },

  remove: async (req, res) => {
    const { id } = req.params
    const room = await Room.findOne({
      include: [{ model: RoomUser }],
      where: { id: id }
    })

    if (!room)
      throwValidationError('A sala não existe.')

    if (room.userId != req.claims.id)
      throwForbiddenError('Usuário sem permissão para remover o item.')

    if (room.startedAt)
      throwValidationError('Uma sala iniciada não pode ser removida.')

    await RoomUser.destroy({ where: { roomId: id } })
    await RoomQuestion.destroy({ where: { roomId: id } })
    await Room.destroy({ where: { id: id } })
    res.json({ message: 'Sala removida com sucesso.' })

    const users = room.RoomUsers.map(p => p.userId)
    const notification = {
      description: 'sala foi removida.',
      type: NotificationTypes.ROOM_REMOVED,
      origin: room.name
    }
    sendNotifications(users, notification)
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

    let notification = { origin: req.claims.name }

    if (associate) {

      if (associated)
        throwValidationError('Usuário já incluso na sala.')

      if (!room.openedAt)
        throwValidationError('A sala ainda não foi aberta.')

      if (room.startedAt)
        throwValidationError('A sala já foi iniciada.')

      await RoomUser.create({ roomId: id, userId: req.claims.id })
      res.json({ message: 'Entrou na sala.' })

      notification.description = 'entrou na sala.'
      notification.type = NotificationTypes.IN_ROOM
      sendNotifications([room.userId], notification)

    } else {
      if (!associated)
        throwValidationError('Usuário não incluso na sala.')
      await RoomUser.destroy({ where: { roomId: id, userId: req.claims.id } })
      res.json({ message: 'Saiu da sala.' })

      notification.description = 'saiu na sala.'
      notification.type = NotificationTypes.OUT_ROOM
      sendNotifications([room.userId], notification)
    }
  },

  save: async (req, res) => {
    const { questions, id, name, time } = req.body

    if (!name)
      throwValidationError('Informe o nome da sala.')

    if (!Array.isArray(questions) || questions.length == 0)
      throwValidationError('Informe as questões.')

    const questionIds = questions.map(p => {
      p.points = Math.floor(p.points / 10) * 10
      return p.id
    })

    if (questions.filter(p => !p.points).length > 0)
      throwValidationError('Há questões sem pontuação.')

    if (questions.filter(p => p.points < 10 || p.points > 100).length > 0)
      throwValidationError('Há questões com pontuação fora do intervalo 10-100.')

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
        userId: req.claims.id,
        createdAt: new Date()
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
        order: q.order,
        points: q.points
      })
    }

    res.json({ message: msgResult })
  },

  changeStatus: async (req, res) => {
    const { status, id } = req.body
    let room = {}
    let msg
    switch (status) {
      case roomStatus.CLOSED:
        room.endedAt = room.startedAt = room.openedAt = null
        msg = 'Sala fechada com sucesso'
        break
      case roomStatus.OPENED:
        room.openedAt = new Date()
        room.endedAt = room.startedAt = null
        msg = 'Sala aberta com sucesso'
        break
      case roomStatus.STARTED:
        room.startedAt = new Date()
        room.endedAt = null
        msg = 'Sala iniciada com sucesso'
        break
      case roomStatus.ENDED:
        room.endedAt = new Date()
        msg = 'Sala finalizada com sucesso'
        break
      default:
        throwValidationError('Status inválido.')
    }

    const roomDb = await Room.findOne({
      include: [{ model: RoomQuestion }, { model: RoomUser }],
      where: { id: id }
    })

    if (!roomDb)
      throwValidationError('A sala não existe.')

    if (roomDb.userId !== req.claims.id)
      throwValidationError('A sala informada não pertence ao usuário.')

    if (roomDb.endedAt)
      throwValidationError('A sala já foi finalizada.')

    await Room.update(room, { where: { id: id } })
    res.json({ message: msg })

    if (status === roomStatus.STARTED || status === roomStatus.CLOSED) {
      const started = status === roomStatus.STARTED
      if (started) {
        await OnlineRoom.create({
          id: id,
          currentOrder: 1,
          changedAt: new Date()
        })
        await RoomAnswer.destroy({ where: { roomId: id } })
      } else {
        await OnlineRoom.destroy({ where: { id: id } })
        await RoomAnswer.destroy({ where: { roomId: id } })
      }

      updateOnlineRooms()

      const notif = {
        description: started ? 'foi iniciada.' : 'foi fechada',
        type: started ? NotificationTypes.ROOM_STARTED : NotificationTypes.ROOM_CLOSED,
        origin: `${id} ${roomDb.name}`
      }
      const users = roomDb.RoomUsers.map(p => p.userId)
      sendNotifications(users, notif)
    }
  }
}