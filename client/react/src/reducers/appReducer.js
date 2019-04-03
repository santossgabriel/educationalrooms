import { Languages } from '../helpers/appTexts'
import { LANGUAGE_CHANGED, USER_CHANGED } from '../actions/actionTypes'
import storageService from '../services/storageService'

const initialState = {
  language: storageService.getLanguage(),
  user: storageService.getUser()
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGE_CHANGED:
      if (action.payload !== Languages.EN_US && action.payload !== Languages.PT_BR)
        return state
      localStorage.setItem('LANGUAGE', action.payload)
      return { ...state, language: action.payload }
    case USER_CHANGED:
      if (action.payload)
        localStorage.setItem('USER', JSON.stringify(action.payload))
      else
        localStorage.removeItem('USER')
      return { ...state, user: action.payload }
    default:
      return state
  }
}