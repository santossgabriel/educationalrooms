import db from '../infra/db/models/index'

const {
  Room,
  RoomAnswer,
  RoomUser,
  User
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

    const myScores = await RoomAnswer.findAll({
      where: { userId: req.claims.id }
    })

    res.json({
      myRoomsScores: myRoomsScores.map(p => toRoomScore(p)),
      myScores: myScores
    })
  }
}