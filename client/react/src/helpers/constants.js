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
    SUBSCRIBE: 'subscribe',
    SEND_ANSWER: 'sendAnswer',
    IN_ROOM: 'inRoom',
  },
  Client: {
    NOTIFICATION_RECEIVED: 'notificationReceived',
    QUESTION_RECEIVED: 'questionReceived',
    FEEDBACK_ANSWER: 'feedbackAnswer',
    FINISH_ROOM: 'finishRoom'
  }
}