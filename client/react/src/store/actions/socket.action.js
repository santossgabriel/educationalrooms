import { roomStarted } from './'
import { SocketEvents, NotificationTypes } from 'helpers'

const { Client } = SocketEvents

const notificationReceived = notification => ({
  type: Client.NOTIFICATION_RECEIVED,
  payload: notification
})

const feedbackReceived = feedback => ({
  type: Client.FEEDBACK_ANSWER,
  payload: feedback
})

const roomFinished = (data) => ({
  type: Client.FINISH_ROOM,
  payload: data
})

const questionReceived = question => ({
  type: Client.QUESTION_RECEIVED,
  payload: question
})

const errorReceived = message => ({
  type: Client.ON_ERROR,
  payload: message
})

const mapActionsToSocket = (socket, dispatch) => {
  socket.on(Client.FEEDBACK_ANSWER, data => dispatch(feedbackReceived(data)))
  socket.on(Client.FINISH_ROOM, data => dispatch(roomFinished(data)))
  socket.on(Client.ON_ERROR, data => dispatch(errorReceived(data)))
  socket.on(Client.QUESTION_RECEIVED, data => dispatch(questionReceived(data)))

  socket.on(Client.NOTIFICATION_RECEIVED, data => {
    dispatch(notificationReceived(data))
    if (data.type === NotificationTypes.ROOM_STARTED) {
      const sp = data.origin.split(' ')
      dispatch(roomStarted({ id: sp[0], name: sp[1] }))
    }
  })
}

export const SocketActions = {
  notificationReceived,
  feedbackReceived,
  roomFinished,
  questionReceived,
  errorReceived,
  mapActionsToSocket
}