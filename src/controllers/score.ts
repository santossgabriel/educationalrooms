import db from '../infra/db/models/index'
import { Op } from 'sequelize'
import { AppRequest, AppResponse } from '../models/app.model'

const {
  Room,
  RoomAnswer,
  RoomUser,
  User,
  RoomQuestion,
  Question,
  sequelize
} = db

const toMyRooms = (room: any) => {
  const result = {
    id: room.id,
    name: room.name,
    questions: room.RoomQuestions.map((p: any) => ({
      id: p.Question.id,
      order: p.order,
      points: p.points,
      description: p.Question.description,
      score: null
    }))
  } as any

  room.RoomAnswers.forEach((p: any) => {
    const q = result.questions.filter((x: any) => x.id === p.questionId).shift()
    if (q)
      q.score = p.score
  })

  result.users = room.RoomUsers.map((p: any) => {
    const user = {
      score: 0,
      id: p.User.id,
      name: p.User.name,
      picture: p.User.picture
    } as any

    const userAnswers = room.RoomAnswers.filter((x: any) => x.userId === user.id).map((x: any) => x.score)
    if (userAnswers.length)
      user.score = userAnswers.reduce((x: any, y: any) => x + y)

    user.questions = room.RoomAnswers.filter((x: any) => x.userId === user.id).map((x: any) => {
      let question = {}
      const q = result.questions.filter((y: any) => y.id === x.questionId).shift()
      if (q)
        question = {
          id: q.id,
          order: q.order,
          points: q.points,
          description: q.description,
          score: x.score
        }
      return question
    })

    return user
  })

  return result
}

export default {

  getScores: async (req: AppRequest, res: AppResponse) => {

    const myRoomsScores = (await Room.findAll({
      where: { endedAt: { [Op.ne]: null } },
      attributes: ['id', 'name'],
      include: [
        {
          model: RoomUser,
          attributes: ['userId'],
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'picture']
            }
          ]
        },
        {
          model: RoomQuestion,
          attributes: ['order', 'points'],
          include: [{
            model: Question, attributes: ['description', 'id']
          }]
        },
        {
          model: RoomAnswer,
          attributes: ['questionId', 'score', 'userId'],
          required: false
        }
      ]
    })).map((p: any) => toMyRooms(p))

    const roomsScores = [] as any
    myRoomsScores.forEach((p: any) => {
      const q = { roomId: p.id, score: 0, points: 0 }
      if (p.questions.length > 0) {
        q.score = p.questions.map((x: any) => x.score).reduce((x: any, y: any) => x + y)
        q.points = p.questions.map((x: any) => x.points).reduce((x: any, y: any) => x + y)
      }
      roomsScores.push(q)
    })

    const allUserScores = await RoomAnswer.findAll({
      attributes: ['roomId', 'userId', [sequelize.fn('sum', sequelize.col('score')), 'score']],
      group: ['roomId', 'userId'],
      order: sequelize.literal('score desc')
    })

    res.json({
      roomsScores,
      myRoomsScores,
      allUserScores
    })
  },

  getScoresGraph: async (req: AppRequest, res: AppResponse) => {

    const userScores = await RoomAnswer.findAll({
      attributes: ['roomId', [sequelize.fn('sum', sequelize.col('score')), 'score']],
      where: { userId: req.claims.id },
      group: ['roomId']
    })

    const rooms = await Room.findAll({
      attributes: ['id', 'endedAt'],
      where: { endedAt: { [Op.ne]: null } },
      include: [{
        model: RoomAnswer,
        attributes: [],
        where: { userId: req.claims.id },
        order: sequelize.literal('endedAt desc')
      }]
    })

    const roomPoints = await RoomQuestion.findAll({
      attributes: ['roomId', [sequelize.fn('sum', sequelize.col('points')), 'points']],
      group: ['roomId']
    })

    const scores = [] as any
    rooms.forEach((p: any) => {
      const us = userScores.find((x: any) => x.roomId === p.id)
      const points = roomPoints.find((x: any) => x.roomId === p.id)
      if (us)
        scores.push({
          roomId: p.id,
          score: Number(us.score),
          points: Number(points.points),
          endedAt: p.endedAt
        })
    })

    res.json(scores)
  }
}