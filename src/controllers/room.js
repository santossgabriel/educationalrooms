import db from '../infra/db/models/index'
import { throwForbiddenError, throwValidationError } from '../helpers/error'

const { Room, RoomUser, User } = db

const toMy = (rooms) => {
  return rooms.map(p => ({
    id: p.id,
    name: p.name,
    secondsStep: p.secondsStep,
    createdAt: p.createdAt,
    endedAt: p.endedAt,
    userId: p.userId,
    users: p.RoomUsers.map(p => ({
      roomUserId: p.id,
      userId: p.userId,
      accepted: p.accepted,
      name: p.User.name,
      email: p.User.email
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
      include: [{ model: RoomUser, include: [{ model: User }] }]
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
  }
}