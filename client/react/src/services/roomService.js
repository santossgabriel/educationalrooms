import httpService from './httpService'

const getMy = () => httpService.get('/room-my')
const save = (q) => httpService.post('/room', q)
const changeStatus = (id, status) => httpService.put('/room-status', { id, status })
const remove = (id) => httpService.delete(`/room/${id}`)

export default {
  getMy,
  save,
  changeStatus,
  remove
}