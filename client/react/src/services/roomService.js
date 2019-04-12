import httpService from './httpService'

const getMy = () => httpService.get('/room-my')
const save = (q) => httpService.post('/room', q)
const changeStatus = (id, status) => httpService.put('/room-status', { id, status })

export default {
  getMy,
  save,
  changeStatus
}