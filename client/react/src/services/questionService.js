import httpService from './httpService'

const getMy = () => httpService.get('/question')
const getOthers = () => httpService.get('/question-others')

export default {
  getMy,
  getOthers
}