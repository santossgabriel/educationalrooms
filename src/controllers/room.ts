import { Op } from 'sequelize'

import db from '../infra/db/models/index'
import { throwForbiddenError, throwValidationError } from '../helpers/error'
import { questionStatus } from './question'
import { sendNotifications, updateOnlineRooms } from '../socket'

import { NotificationTypes } from './notification'
import { Languages } from '../helpers/utils'
import { AppRequest, AppResponse } from '../models/app.model'

const { BR, EN } = Languages

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

const toMy = (p: any) => {
  if (!p)
    return null
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
    users: p.RoomUsers.map((x: any) => ({
      roomUserId: x.id,
      userId: x.userId,
      accepted: x.accepted,
      name: x.User.name,
      email: x.User.email
    })),
    questions: p.RoomQuestions.map((x: any) => ({
      id: x.Question.id,
      description: x.Question.description,
      points: x.points,
      shared: x.Question.shared,
      area: x.Question.area,
      difficulty: x.Question.difficulty,
      createdAt: x.Question.createdAt,
      updatedAt: x.Question.updatedAt,
      order: x.order
    }))
  }
}

const toMyAssoc = (rooms: any) => {
  return rooms.map((p: any) => ({
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

const getStatusRoom = (room: any) => {
  if (room.endedAt)
    return roomStatus.ENDED
  if (room.startedAt)
    return roomStatus.STARTED
  if (room.openedAt)
    return roomStatus.OPENED
  return roomStatus.CLOSED
}

const toOpened = (room: any, userId: any) => {
  return {
    id: room.id,
    name: room.name,
    time: room.time,
    createdAt: room.createdAt,
    openedAt: room.openedAt,
    users: room.RoomUsers.length,
    questions: room.RoomQuestions.length,
    owner: room.User.name,
    associate: room.RoomUsers.filter((p: any) => p.userId === userId).length > 0
  }
}

export default {

  get: async (req: AppRequest, res: AppResponse) => {
    const room = await Room.findOne({
      where: { userId: req.claims.id, id: req.params.id },
      include: [
        { model: RoomUser, include: [{ model: User }] },
        { model: RoomQuestion, include: [{ model: Question }] }
      ]
    })
    res.json(toMy(room))
  },

  getQuiz: async (req: AppRequest, res: AppResponse) => {
    const room = await Room.findOne({
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
      throwValidationError({
        [EN]: 'The room is not available yet.',
        [BR]: 'A sala não está disponível no momento.'
      })

    let score = 0
    if (room && room.endedAt) {
      const answers = await RoomAnswer.findAll({
        where: { roomId: req.params.id, userId: req.claims.id }
      })
      if (answers.length > 0)
        score = answers.map((p: any) => p.score).reduce((x: any, y: any) => x + y)
    }

    res.json({
      createdAt: room.createdAt,
      endedAt: room.endedAt,
      id: room.id,
      name: room.name,
      openedAt: room.openedAt,
      startedAt: room.startedAt,
      time: room.time,
      score
    })
  },

  getMy: async (req: AppRequest, res: AppResponse) => {
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
    res.json(rooms.map((p: any) => toMy(p)))
  },

  getMyAssociated: async (req: AppRequest, res: AppResponse) => {
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

  getOpened: async (req: AppRequest, res: AppResponse) => {
    const rooms = await Room.findAll({
      include: [
        { model: RoomUser },
        { model: User },
        { model: RoomQuestion }
      ],
      order: [['openedAt', 'desc']],
      where: {
        openedAt: { [Op.ne]: null },
        startedAt: null
      }
    })
    res.json(rooms.map((p: any) => toOpened(p, req.claims.id)))
  },

  remove: async (req: AppRequest, res: AppResponse) => {
    const { id } = req.params
    const room = await Room.findOne({
      include: [{ model: RoomUser }],
      where: { id }
    })

    if (!room)
      throwValidationError({
        [EN]: 'The room does not exist.',
        [BR]: 'A sala não existe.'
      })

    if (room.userId !== req.claims.id)
      throwForbiddenError({
        [EN]: 'Without permission to remove this room.',
        [BR]: 'Sem permissão para remover esta sala.'
      })

    if (room.startedAt)
      throwValidationError({
        [EN]: 'A room started can not be removed.',
        [BR]: 'Uma sala iniciada não pode ser removida.'
      })

    await RoomUser.destroy({ where: { roomId: id } })
    await RoomQuestion.destroy({ where: { roomId: id } })
    await Room.destroy({ where: { id } })
    res.json({
      message: {
        [EN]: 'Room removed successfully.',
        [BR]: 'Sala removida com sucesso.'
      }
    })

    const users = room.RoomUsers.map((p: any) => p.userId)
    const notification = {
      type: NotificationTypes.ROOM_REMOVED,
      origin: room.name
    }
    sendNotifications(users, notification)
  },

  associate: async (req: AppRequest, res: AppResponse) => {
    const { id, associate } = req.body
    const room = await Room.findOne({
      include: [{ model: RoomUser }],
      where: { id }
    })

    if (!room)
      throwValidationError({
        [EN]: 'The room does not exist.',
        [BR]: 'A sala não existe.'
      })

    const associated = room.RoomUsers.filter((p: any) => p.userId === req.claims.id).length > 0

    const notification = { origin: `${id}-${req.claims.name}` } as any

    if (associate) {

      if (associated)
        throwValidationError({
          [EN]: 'User already included in room.',
          [BR]: 'Usuário já incluso na sala.'
        })

      if (!room.openedAt)
        throwValidationError({
          [EN]: 'The room is not open yet.',
          [BR]: 'A sala não está aberta ainda.'
        })

      if (room.startedAt)
        throwValidationError({
          [EN]: 'The room has already been started.',
          [BR]: 'A sala já foi iniciada.'
        })

      await RoomUser.create({ roomId: id, userId: req.claims.id })
      res.json({
        message: {
          [EN]: 'Came into the room.',
          [BR]: 'Entrou na sala.'
        }
      })

      notification.type = NotificationTypes.IN_ROOM
      sendNotifications([room.userId], notification)

    } else {
      if (!associated)
        throwValidationError({
          [EN]: 'Not included in the room.',
          [BR]: 'Usuário não incluso na sala.'
        })
      await RoomUser.destroy({ where: { roomId: id, userId: req.claims.id } })
      res.json({ message: { [EN]: 'Leave the room.', [BR]: 'Saiu da sala.' } })

      notification.type = NotificationTypes.OUT_ROOM
      sendNotifications([room.userId], notification)
    }
  },

  save: async (req: AppRequest, res: AppResponse) => {
    const { questions, id, name, time } = req.body

    if (!name)
      throwValidationError({
        [EN]: 'Provide the room name.',
        [BR]: 'Informe o nome da sala.'
      })

    if (isNaN(time) || Number(time) < 1)
      throwValidationError({
        [EN]: 'Provide the time for each question.',
        [BR]: 'Informe o tempo de cada questão.'
      })

    if (!Array.isArray(questions) || questions.length === 0)
      throwValidationError({ [EN]: 'Provide the questions', [BR]: 'Informe as questões.' })

    const questionIds = questions.map((p: any) => {
      p.points = Math.floor(p.points / 10) * 10
      return p.id
    })

    if (questions.filter((p: any) => !p.points).length > 0)
      throwValidationError({
        [EN]: 'There are questions without score.',
        [BR]: 'Há questões sem pontuação.'
      })

    if (questions.filter((p: any) => p.points < 10 || p.points > 100).length > 0)
      throwValidationError({
        [EN]: 'There are questions with scores out of range 10-100.',
        [BR]: 'Há questões com pontuação fora do intervalo 10-100.'
      })

    const questionsDb = await Question.findAll({ where: { id: questionIds } })
    const questionsIdsDb = questionsDb.map((p: any) => p.id)
    if (questionIds.filter((p: any) => questionsIdsDb.indexOf(p) === -1).length > 0)
      throwValidationError({
        [EN]: 'There are informed questions that do not exist.',
        [BR]: 'Há questões informadas que não existem.'
      })

    if (questionsDb.filter((p: any) => p.userId !== req.claims.id).length > 0)
      throwValidationError({
        [EN]: 'There are informed questions that do not belong to the user.',
        [BR]: 'Há questões informadas que não pertencem ao usuário.'
      })

    let room = null
    let msgResult: any

    if (id > 0) {

      room = await Room.findOne({
        include: [{ model: RoomQuestion }],
        where: { id }
      })

      if (!room)
        throwValidationError({
          [EN]: 'The room does not exist.',
          [BR]: 'A sala não existe.'
        })

      if (room.userId !== req.claims.id)
        throwValidationError({
          [EN]: 'The informed room does not belong to the user.',
          [BR]: 'A sala informada não pertence ao usuário.'
        })

      await Room.update(
        { name, time },
        { where: { id } }
      )

      msgResult = { [EN]: 'Room updated successfully.', [BR]: 'Sala atualizada com sucesso.' }

    } else {
      room = {
        name,
        time,
        userId: req.claims.id,
        createdAt: new Date()
      }
      room = await Room.create(room)
      msgResult = { [EN]: 'Room created successfully.', [BR]: 'Sala criada com sucesso.' }
    }

    await RoomQuestion.destroy({ where: { roomId: id } })

    for (const questionId of questionIds) {
      const q = questions.filter((p: any) => p.id === questionId).shift()
      await RoomQuestion.create({
        roomId: id || room.id,
        questionId: q.id,
        order: q.order,
        points: q.points
      })
    }

    res.json({ message: msgResult })
  },

  changeStatus: async (req: AppRequest, res: AppResponse) => {
    const { status, id } = req.body
    const room = {} as any
    let msg
    switch (status) {
      case roomStatus.CLOSED:
        room.endedAt = room.startedAt = room.openedAt = null
        msg = { [EN]: 'Room was closed successfully.', [BR]: 'Sala foi fechada com sucesso.' }
        break
      case roomStatus.OPENED:
        room.openedAt = new Date()
        room.endedAt = room.startedAt = null
        msg = { [EN]: 'Room was opened successfully.', [BR]: 'Sala foi aberta com sucesso.' }
        break
      case roomStatus.STARTED:
        room.startedAt = new Date()
        room.endedAt = null
        msg = { [EN]: 'Room was started successfully.', [BR]: 'Sala foi iniciada com sucesso.' }
        break
      case roomStatus.ENDED:
        room.endedAt = new Date()
        msg = { [EN]: 'Room was finished successfully.', [BR]: 'Sala foi finalizada com sucesso.' }
        break
      default:
        throwValidationError({ [EN]: 'Invalid status.', [BR]: 'Status inválido.' })
    }

    const roomDb = await Room.findOne({
      include: [{ model: RoomQuestion }, { model: RoomUser }],
      where: { id }
    })

    if (!roomDb)
      throwValidationError({
        [EN]: 'The room does not exist.',
        [BR]: 'A sala não existe.'
      })

    if (roomDb.userId !== req.claims.id)
      throwValidationError({
        [EN]: 'The informed room does not belong to the user.',
        [BR]: 'A sala informada não pertence ao usuário.'
      })

    if (roomDb.endedAt)
      throwValidationError({
        [EN]: 'The room already is finished.',
        [BR]: 'A sala já foi finalizada.'
      })

    await Room.update(room, { where: { id } })


    if (status === roomStatus.STARTED || status === roomStatus.CLOSED) {
      const started = status === roomStatus.STARTED
      if (started) {
        await OnlineRoom.create({
          id,
          currentOrder: 1,
          changedAt: new Date()
        })
        await RoomAnswer.destroy({ where: { roomId: id } })
      } else {
        await OnlineRoom.destroy({ where: { id } })
        await RoomAnswer.destroy({ where: { roomId: id } })
      }

      updateOnlineRooms()

      const notif = {
        type: started ? NotificationTypes.ROOM_STARTED : NotificationTypes.ROOM_CLOSED,
        origin: `${id} ${roomDb.name}`
      }

      const users = roomDb.RoomUsers.map((p: any) => p.userId)
      sendNotifications(users, notif)
    }

    res.json({ message: msg })
  }
}