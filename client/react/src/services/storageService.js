import { Languages } from '../helpers/appTexts'

const getDefaultLanguage = () => {
  return navigator.language === 'pt-BR' ? Languages.PT_BR : Languages.EN_US
}

const keys = {
  USER: 'USER',
  LANGUAGE: 'LANGUAGE',
  TOKEN: 'TOKEN'
}

export default {
  getLanguage: () => localStorage.getItem(keys.LANGUAGE) || getDefaultLanguage(),
  setLanguage: l => localStorage.setItem(keys.LANGUAGE, l || getDefaultLanguage()),
  getUser: () => JSON.parse(localStorage.getItem(keys.USER)),
  setUser: user => user ? localStorage.setItem(keys.USER, JSON.stringify(user)) : localStorage.removeItem(keys.USER),
  getToken: () => localStorage.getItem(keys.TOKEN),
  setToken: token => localStorage.setItem(keys.TOKEN, token)
}