import { Languages } from '../helpers/appTexts'

const getDefaultLanguage = () => {
  return navigator.language === 'pt-BR' ? Languages.PT_BR : Languages.EN_US
}

export default {
  getLanguage: () => localStorage.getItem('LANGUAGE') || getDefaultLanguage(),
  getUser: () => JSON.parse(localStorage.getItem('USER'))
}