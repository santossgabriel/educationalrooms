import db from '../infra/db/models/index'

const {
  Room,
  RoomAnswer,
  RoomUser,
  User,
  RoomQuestion,
  Question,
  sequelize
} = db

const toMyRooms = (room) => {
  let result = {
    id: room.id,
    name: room.name,
    questions: room.RoomQuestions.map(p => ({
      id: p.Question.id,
      order: p.order,
      points: p.points,
      description: p.Question.description,
      score: null
    }))
  }

  room.RoomAnswers.forEach(p => {
    const q = result.questions.filter(x => x.id == p.questionId).shift()
    if (q)
      q.score = p.score
  })

  result.users = room.RoomUsers.map(p => {
    let user = {
      score: 0,
      id: p.User.id,
      name: p.User.name,
      picture: p.User.picture
    }

    const userAnswers = room.RoomAnswers.filter(x => x.userId == user.id).map(x => x.score)
    if (userAnswers.length > 0)
      user.score = userAnswers.reduce((x, y) => x + y)

    user.questions = room.RoomAnswers.filter(x => x.userId == user.id).map(x => {
      let question = {}
      const q = result.questions.filter(y => y.id == x.questionId).shift()
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

  getScores: async (req, res) => {

    const myRoomsScores = (await Room.findAll({
      where: { endedAt: { [sequelize.Op.ne]: null } },
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
    })).map(p => toMyRooms(p))

    let roomsScores = []
    myRoomsScores.forEach(p => {
      let q = { roomId: p.id, score: 0, points: 0 }
      if (p.questions.length > 0) {
        q.score = p.questions.map(x => x.score).reduce((x, y) => x + y)
        q.points = p.questions.map(x => x.points).reduce((x, y) => x + y)
      }
      roomsScores.push(q)
    })

    const allUserScores = await RoomAnswer.findAll({
      attributes: ['roomId', 'userId', [sequelize.fn('sum', sequelize.col('score')), 'score']],
      group: ['roomId', 'userId'],
      order: sequelize.literal('score desc')
    })

    res.json({
      roomsScores: roomsScores,
      myRoomsScores: myRoomsScores,
      allUserScores: allUserScores
    })
  },

  getScoresGraph: async (req, res) => {

    const userScores = await RoomAnswer.findAll({
      attributes: ['roomId', [sequelize.fn('sum', sequelize.col('score')), 'score']],
      where: { userId: req.claims.id },
      group: ['roomId']
    })

    const rooms = await Room.findAll({
      attributes: ['id', 'endedAt'],
      where: { endedAt: { [sequelize.Op.ne]: null } },
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

    const scores = []
    rooms.forEach(p => {
      const us = userScores.find(x => x.roomId == p.id)
      const points = roomPoints.find(x => x.roomId == p.id)
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