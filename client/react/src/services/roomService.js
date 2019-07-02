import httpService from './httpService'

const get = id => httpService.get(`/room/${id}`)
const getMy = () => httpService.get('/room-my')
const save = q => httpService.post('/room', q)
const changeStatus = (id, status) => httpService.put('/room-status', { id, status })
const remove = id => httpService.delete(`/room/${id}`)

export default {
  get,
  getMy,
  save,
  changeStatus,
  remove
}