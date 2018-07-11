import socketIo from 'socket.io'
import jwt from 'jsonwebtoken'
import config from '../infra/config'
import db from '../infra/db/models/index'

const { Log } = db

const rooms = {}
rooms['Room 1'] = { sockets: [] }
rooms['Room 2'] = { sockets: [] }

let sockets = []

export const getSockets = () => {
  return sockets
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
        // console.log(io.sockets.length)
        // for (let key in io.sockets.sockets)
        //   console.log(io.sockets.sockets[key].userId)


        // let s = sockets.filter(p => p.id === data.id).shift()
        // if (!s)
        //   s = { id: data.id, sockets: [] }
        // s.sockets.push(socket)
        // sockets.push(s)
        // console.log(sockets)
      })
    })

    // sockets.push(socket)
    // if (process.env.NODE_ENV !== 'test')
    //   console.log(`Connected socket: ${socket.id}`)
    // socket.emit('receiveRooms', rooms)
    // socket.on('joinRoom', (roomName) => {
    //   if (rooms.hasOwnProperty(roomName)) {
    //     console.log(`Socket ${socket.id} joined in ${roomName}`)
    //     rooms[roomName].sockets.push(socket.id)
    //   }
    // })

    socket.on('notificationReceived', (n) => {
      socket.emit('notificationReceived', n)
    })
  })
}