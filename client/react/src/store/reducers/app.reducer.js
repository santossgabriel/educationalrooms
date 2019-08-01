import { Languages } from 'helpers/appTexts'
import { ActionTypes } from 'store/actions'
import storageService from 'services/storageService'
import { notificationResolver } from 'resolvers/notificationResolver'

const initialState = {
  language: storageService.getLanguage(),
  user: storageService.getUser(),
  online: false,
  notifications: []
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LANGUAGE_CHANGED:
      if (action.payload !== Languages.EN_US && action.payload !== Languages.PT_BR)
        return state
      storageService.setLanguage(action.payload)
      return { ...state, language: action.payload }

    case ActionTypes.USER_CHANGED:
      storageService.setUser(action.payload)
      return { ...state, user: action.payload }

    case ActionTypes.ONLINE_CHANGED:
      return { ...state, online: action.payload }

    case ActionTypes.NOTIFICATIONS_CHANGED:
      return { ...state, notifications: notificationResolver(action.payload) }

    default:
      return state
  }
}