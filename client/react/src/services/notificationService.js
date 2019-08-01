import httpService from './httpService'

const getAll = () => httpService.get('/notification')
const remove = id => httpService.delete(`/notification/${id}`)
const removeAll = () => httpService.delete('/notification')
const markRead = () => httpService.put('/notification-read', null)

export default {
  getAll,
  remove,
  removeAll,
  markRead
}