import socketIo from 'socket.io'
import jwt from 'jsonwebtoken'
import config from '../infra/config'
import db from '../infra/db/models/index'
import { cloneObject } from '../helpers/utils'

const {
  sequelize,
  Log,
  Notification,
  Room,
  RoomUser,
  RoomQuestion,
  Question,
  Answer,
  OnlineRoom,
  RoomAnswer
} = db

const SocketEvents = {
  Server: {
    SUBSCRIBE: 'subscribe',
    SEND_ANSWER: 'sendAnswer',
    IN_ROOM: 'inRoom',
  },
  Client: {
    NOTIFICATION_RECEIVED: 'notificationReceived',
    QUESTION_RECEIVED: 'questionReceived',
    FEEDBACK_ANSWER: 'feedbackAnswer',
    FINISH_ROOM: 'finishRoom'
  }
}

const toQuizQuestion = (q) => {
  q.answers = q.answers.map(p => {
    return {
      id: p.id,
      description: p.description,
      classification: p.classification
    }
  })
  return q
}

const getCurrentQuestion = (roomId) => {
  return currentQuestions.filter(p => p.roomId == roomId).shift()
}

let sockets = []
let onlineRooms = []
let currentQuestions = []

export const updateOnlineRooms = async () => {
  const rooms = await Room.findAll({
    attributes: ['id', 'name', 'time'],
    where: {
      startedAt: { [sequelize.Op.ne]: null },
      endedAt: null
    },
    include: [
      { model: RoomUser, attributes: ['userId', 'accepted'] },
      {
        model: RoomQuestion,
        attributes: ['questionId', 'order', 'points'],
        include: [
          {
            model: Question,
            attributes: ['id', 'description', 'category'],
            include: [
              { model: Answer, attributes: ['id', 'description', 'correct', 'classification'] }
            ]
          }
        ]
      }
    ]
  })

  onlineRooms = rooms.map(room => ({
    id: room.id,
    name: room.name,
    time: room.time,
    users: room.RoomUsers.map(p => ({
      id: p.userId,
      accepted: p.accepted
    })),
    questions: room.RoomQuestions.map(p => ({
      id: p.questionId,
      order: p.order,
      points: p.points,
      description: p.Question.description,
      category: p.Question.category,
      answers: p.Question.Answers.map(x => x)
    }))
  }))

  await updateCurrentQuestions()
}

const updateCurrentQuestions = async () => {
  currentQuestions = []
  await OnlineRoom.findAll().map(p => {
    const onlineRoom = onlineRooms.filter(x => x.id == p.id).shift()
    if (onlineRoom) {
      let question = onlineRoom.questions.filter(x => x.order == p.currentOrder).shift()
      if (question) {
        question.roomId = onlineRoom.id
        question.changedAt = p.changedAt
        question.time = onlineRoom.time
        return currentQuestions.push(toQuizQuestion(question))
      }
    }
  })
}

const startTimer = async () => {
  onlineRooms.forEach(async r => {
    const q = currentQuestions.filter(p => p.roomId == r.id).shift()
    const diff = Math.floor((new Date()).getTime() - q.changedAt.getTime())
    const seconds = Math.floor(diff / 1000)
    const users = r.users.map(p => p.id)
    if (seconds > q.time) {
      const nextQuestion = r.questions.filter(p => p.order == (q.order + 1)).shift()
      if (nextQuestion) {

        await OnlineRoom.update({
          currentOrder: nextQuestion.order,
          changedAt: new Date()
        }, { where: { id: r.id } })
        await updateCurrentQuestions()
        setTimeout(() => {
          notifyChangedQuestion(nextQuestion, users)
        }, 2000)
      } else {
        await Room.update({ endedAt: new Date() }, { where: { id: r.id } })
        await OnlineRoom.destroy({ where: { id: r.id } })
        onlineRooms = onlineRooms.filter(p => p.id != r.id)
        setTimeout(() => {
          notifyFinish(r.id, users)
        }, 2000)
      }
      sendFeedback(r.id, q.id, users)
    }
  })
}

const sendFeedback = async (roomId, questionId, users) => {
  const correctAnswer = await Answer.findOne({
    where: {
      questionId: questionId,
      correct: true
    }
  })
  const answers = await RoomAnswer.findAll({ where: { id: roomId, questionId: questionId } })
  users.forEach(u => {
    const userAnswer = answers.filter(p => p.userId == u).shift()
    let feedback = ''
    if (userAnswer) {
      if (userAnswer.answerId == correctAnswer.id)
        feedback = 'CORRECT'
      else
        feedback = 'WRONG'
    } else {
      feedback = 'TIME_OVER'
    }
    sockets.filter(p => p.userId === u)
      .forEach(p => p.emit(SocketEvents.Client.FEEDBACK_ANSWER, {
        roomId: roomId,
        feedback: feedback
      }))
  })
}

const notifyChangedQuestion = (question, users) => {
  users.forEach(u => {
    sockets.filter(p => p.userId === u)
      .forEach(p => p.emit(SocketEvents.Client.QUESTION_RECEIVED, question))
  })
}

const notifyFinish = async (roomId, users) => {
  const userAnswers = await RoomAnswer.findAll({
    where: { id: roomId }
  })
  users.forEach(u => {
    const score = userAnswers.filter(p => p.userId == u)
      .map(p => p.score).reduce((x, y) => x + y)
    sockets.filter(p => p.userId == u)
      .forEach(p => p.emit(SocketEvents.Client.FINISH_ROOM, {
        roomId: roomId,
        score: score
      }))
  })
}

export const sendNotifications = (users, notification) => {
  notification.createdAt = new Date()
  users.forEach(async userId => {
    const notif = cloneObject(notification)
    notif.userId = userId
    await Notification.create(notif)
    sockets.filter(p => p.userId === userId)
      .forEach(p => p.emit(SocketEvents.Client.NOTIFICATION_RECEIVED, notif))
  })
}

export const runJob = async () => {
  if (process.env.NODE_ENV !== 'test') {
    await updateOnlineRooms()
    await updateCurrentQuestions()
    setInterval(startTimer, 1000)
  }
}

export default (server) => {
  const io = socketIo(server)
  io.on('connection', (socket) => {

    socket.on(SocketEvents.Server.SUBSCRIBE, token => {
      jwt.verify(token, config.SECRET, (err, data) => {
        if (err) {
          Log.create({ description: 'Não foi possível inscrever socket', date: new Date() })
          return
        }
        socket.userId = data.id
        sockets.push(socket)
      })
    })

    socket.on(SocketEvents.Server.IN_ROOM, async (roomId) => {
      const room = onlineRooms.filter(p => p.id == roomId).shift()
      if (!room) {
        socket.emit('onError', `Sala não está online: ${roomId}`)
        return
      }

      if (!socket.userId) {
        socket.emit('onError', 'Socket sem UserId')
        return
      }

      if (room.users.filter(p => p.id === socket.userId).length == 0) {
        socket.emit('onError', 'Usuário não está escrito na sala.')
        return
      }

      let currentQuestion = cloneObject(getCurrentQuestion(roomId))

      if (currentQuestion) {
        const answered = await RoomAnswer.findOne({
          where: {
            id: roomId,
            questionId: currentQuestion.id,
            userId: socket.userId
          }
        })
        currentQuestion.answered = answered != null
      }

      socket.emit(SocketEvents.Client.QUESTION_RECEIVED, currentQuestion)
    })

    socket.on(SocketEvents.Server.SEND_ANSWER, (answer) => {
      const question = getCurrentQuestion(answer.roomId)
      if (question.id != answer.questionId) {
        socket.emit('onError', 'O tempo acabou.')
        return
      }
      const diff = Math.floor((new Date()).getTime() - question.changedAt.getTime())
      const seconds = Math.floor(diff / 1000)
      let score
      if (seconds <= (question.time / 2))
        score = question.points
      else
        score = (question.points - (question.points * (seconds / question.time))) * 2
      const minScore = question.points * .05
      if (score < minScore)
        score = minScore
      const roomAnswer = {
        id: answer.roomId,
        questionId: answer.questionId,
        answerId: answer.answerId,
        userId: socket.userId,
        score: Math.floor(score)
      }
      RoomAnswer.create(roomAnswer)
    })
  })
}