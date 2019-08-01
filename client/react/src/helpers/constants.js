export const RoomStatus = {
  CLOSED: 'CLOSED',
  OPENED: 'OPENED',
  STARTED: 'STARTED',
  ENDED: 'ENDED'
}

export const QuizStatus = {
  TIME_OVER: 'TIME_OVER',
  ANSWER: 'ANSWER',
  LOADING: 'LOADING',
  CORRECT: 'CORRECT',
  WRONG: 'WRONG',
  SENT: 'SENT',
  UNAVAILABLE: 'UNAVAILABLE',
  ENDED: 'ENDED',
  DISCONNECTED: 'DISCONNECTED'
}

export const SocketEvents = {
  Server: {
    SEND_ANSWER: 'sendAnswer',
    IN_ROOM: 'inRoom',
  },
  Client: {
    NOTIFICATION_RECEIVED: 'notificationReceived',
    QUESTION_RECEIVED: 'questionReceived',
    FEEDBACK_ANSWER: 'feedbackAnswer',
    FINISH_ROOM: 'finishRoom',
    ON_ERROR: 'onError'
  }
}

export const NotificationTypes = {
  IN_ROOM: 'IN_ROOM',
  OUT_ROOM: 'OUT_ROOM',
  ROOM_STARTED: 'ROOM_START',
  ROOM_ENDED: 'ROOM_ENDED',
  ROOM_REMOVED: 'ROOM_REMOVED',
  ROOM_CLOSED: 'ROOM_CLOSED'
}