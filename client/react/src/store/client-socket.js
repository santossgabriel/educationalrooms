import openSocket from 'socket.io-client'
import { storageService } from 'services'
import { SocketActions, onlineChanged } from 'store/actions'

const clientSocket = (() => {
  const _self = {}
  let socket
  let connected = false
  let queue = []

  _self.start = dispatch => {
    if (connected)
      return
    const token = storageService.getToken()
    socket = openSocket({ query: `token=${token}` })

    socket.on('connect', () => {
      connected = true
      queue.forEach(p => socket.emit(p.event, p.data))
      queue = []
      dispatch(onlineChanged(true))
    })

    socket.on('disconnect', () => {
      connected = false
      dispatch(onlineChanged(false))
    })

    SocketActions.mapActionsToSocket(socket, dispatch)
  }

  _self.send = (event, data) => {
    if (connected)
      socket.emit(event, data)
    else
      queue.push({ event, data })
  }

  return _self
})()

export const ClientSocket = clientSocket