import httpService from './httpService'

const getMy = () => httpService.get('/room-my')
const save = (q) => httpService.post('/room', q)

export default {
  getMy,
  save
}