export { SocketActions } from './socket.action'

const LANGUAGE_CHANGED = 'LANGUAGE_CHANGED'
const USER_CHANGED = 'USER_CHANGED'

const CHANGE_VISIBLE_ALERT = 'CHANGE_VISIBLE_ALERT'
const ONLINE_CHANGED = 'ONLINE_CHANGED'
const NOTIFICATIONS_CHANGED = 'NOTIFICATIONS_CHANGED'
const START_QUIZ = 'START_QUIZ'
const ANSWER_SENT = 'ANSWER_SENT'
export const ActionTypes = {
  LANGUAGE_CHANGED,
  USER_CHANGED,
  CHANGE_VISIBLE_ALERT,
  ONLINE_CHANGED,
  NOTIFICATIONS_CHANGED,
  START_QUIZ,
  ANSWER_SENT
}

export const languageChanged = newLanguage => ({
  type: LANGUAGE_CHANGED,
  payload: newLanguage
})

export const userChanged = user => ({
  type: USER_CHANGED,
  payload: user
})

export const onlineChanged = online => ({
  type: ONLINE_CHANGED,
  payload: online
})

export const showError = message => ({
  type: CHANGE_VISIBLE_ALERT,
  payload: { message, type: 'error', show: true }
})

export const showSuccess = message => ({
  type: CHANGE_VISIBLE_ALERT,
  payload: { message, type: 'success', show: true }
})

export const hideAlert = () => ({
  type: CHANGE_VISIBLE_ALERT,
  payload: { message: '', show: false }
})

export const notificationsChanged = notifications => ({
  type: NOTIFICATIONS_CHANGED,
  payload: notifications
})

export const startQuiz = roomId => ({
  type: START_QUIZ,
  payload: roomId
})

export const answerSent = answer => ({
  type: ANSWER_SENT,
  payload: answer
})
