import socketIo from 'socket.io'
import jwt from 'jsonwebtoken'
import config from '../infra/config'
import db from '../infra/db/models/index'
import { cloneObject } from '../helpers/utils'

const { Log, Notification } = db

const rooms = {}
rooms['Room 1'] = { sockets: [] }
rooms['Room 2'] = { sockets: [] }

let sockets = []

export const getSockets = () => {
  return sockets
}

export const sendNotifications = (users, notification) => {
  notification.createdAt = new Date()
  users.forEach(async userId => {
    const notif = cloneObject(notification)
    notif.userId = userId
    await Notification.create(notif)
    const sockets = getSockets().filter(p => p.userId === userId)
    sockets.forEach(p => p.emit('notificationReceived', notif))
  })
}

// setInterval(() => {
//   sockets.forEach(s => s.sockets.forEach(p => p.emit('notificationReceived')))
// }, 5000)

export default (server) => {
  const io = socketIo(server)
  io.on('connection', (socket) => {

    socket.on('subscribe', token => {

      jwt.verify(token, config.SECRET, (err, data) => {
        if (err) {
          Log.create({ description: 'Não foi possível inscrever socket', date: new Date() })
          return
        }

        socket.userId = data.id
        sockets.push(socket)
      })
    })

    socket.on('notificationReceived', (n) => {
      socket.emit('notificationReceived', n)
    })
  })
}