import { LANGUAGE_CHANGED } from './actionTypes'

export const languageChanged = newLanguage => ({
  type: LANGUAGE_CHANGED,
  payload: newLanguage
})