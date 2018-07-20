import db from '../infra/db/models/index'

const {
  Room,
  RoomAnswer,
  RoomUser,
  User,
  RoomQuestion,
  Question
} = db

const toRoomScore = (r) => {
  const users = r.RoomUsers.map(p => {
    let user = {
      score: 0,
      id: p.User.id,
      name: p.User.name,
      picture: p.User.picture
    }
    const userAnswers = r.RoomAnswers.filter(x => x.userId == user.id).map(x => x.score)
    if (userAnswers.length > 0)
      user.score = userAnswers.reduce((x, y) => x + y)
    return user
  })

  return {
    id: r.id,
    name: r.name,
    users: users
  }
}

const toMyRooms = (room) => {
  let result = {
    id: room.id,
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

  return result
}

export default {

  getScores: async (req, res) => {

    const myRoomsScores = await Room.findAll({
      attributes: ['id', 'name'],
      where: { userId: req.claims.id },
      include: [
        {
          model: RoomUser, attributes: ['userId'],
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'picture']
            }
          ]
        },
        {
          attributes: ['score', 'userId'],
          model: RoomAnswer
        }
      ]
    })

    const questionsRoomScores = (await Room.findAll({
      attributes: ['id'],
      include: [
        { model: RoomUser, attributes: [], where: { userId: req.claims.id } },
        {
          model: RoomQuestion,
          attributes: ['order', 'points'],
          include: [{
            model: Question, attributes: ['description', 'id']
          }]
        },
        {
          model: RoomAnswer,
          attributes: ['questionId', 'score'],
          where: { userId: req.claims.id },
          required: false
        }
      ]
    })).map(p => toMyRooms(p))

    let roomsScores = []
    questionsRoomScores.forEach(p => {
      let q = { roomId: p.id, score: 0, points: 0 }
      if (p.questions.length > 0) {
        q.score = p.questions.map(x => x.score).reduce((x, y) => x + y)
        q.points = p.questions.map(x => x.points).reduce((x, y) => x + y)
      }
      roomsScores.push(q)
    })

    res.json({
      myRoomsScores: myRoomsScores.map(p => toRoomScore(p)),
      roomsScores: roomsScores,
      questionsRoomScores: questionsRoomScores
    })
  }
}