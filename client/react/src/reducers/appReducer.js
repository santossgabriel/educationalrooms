import { Languages } from '../helpers/appTexts'
import { LANGUAGE_CHANGED, USER_CHANGED, ONLINE_CHANGED, NOTIFICATIONS_CHANGED } from '../actions/actionTypes'
import storageService from '../services/storageService'
import { notificationResolver } from '../resolvers/notificationResolver'

const initialState = {
  language: storageService.getLanguage(),
  user: storageService.getUser(),
  online: false,
  notifications: []
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGE_CHANGED:
      if (action.payload !== Languages.EN_US && action.payload !== Languages.PT_BR)
        return state
      storageService.setLanguage(action.payload)
      return { ...state, language: action.payload }

    case USER_CHANGED:
      storageService.setUser(action.payload)
      return { ...state, user: action.payload }

    case ONLINE_CHANGED:
      return { ...state, online: action.payload }

    case NOTIFICATIONS_CHANGED:
      return { ...state, notifications: notificationResolver(action.payload) }

    default:
      return state
  }
}