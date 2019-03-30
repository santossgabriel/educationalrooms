import { Languages } from '../helpers/appTexts'

export default {
  getLanguage: () => localStorage.getItem('LANGUAGE') || Languages.EN_US,
  getUser: () => JSON.parse(localStorage.getItem('USER'))
}