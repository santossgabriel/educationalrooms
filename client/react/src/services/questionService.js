import httpService from './httpService'

const getMy = () => httpService.get('/question')
const getOthers = () => httpService.get('/question-others')
const getAreas = () => httpService.get('/areas')

export default {
  getMy,
  getOthers,
  getAreas
}