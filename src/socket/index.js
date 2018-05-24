import socketIo from 'socket.io'

const rooms = {}
rooms['Room 1'] = { sockets: [] }
rooms['Room 2'] = { sockets: [] }

export default (server) => {
  const io = socketIo(server)
  io.on('connection', (socket) => {
    if (process.env.NODE_ENV !== 'test')
      console.log('Connected socket: ' + socket.id)
    socket.emit('receiveRooms', rooms)
    socket.on('joinRoom', (roomName) => {
      if (rooms.hasOwnProperty(roomName)) {
        console.log(`Socket ${socket.id} joined in ${roomName}`)
        rooms[roomName].sockets.push(socket.id)
      }
    })
  })
}