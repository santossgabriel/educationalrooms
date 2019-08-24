export { AppTexts, Languages } from './appTexts'
export { AppTheme, Colors } from './themes'
export { RoomStatus, QuizStatus, SocketEvents, NotificationTypes } from './constants'
export { toDateFormat } from './date'

export const getMatchMedia = () => window.matchMedia('(min-width: 1280px)')
