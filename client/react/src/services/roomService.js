import httpService from './httpService'

const get = id => httpService.get(`/room/${id}`)
const getQuiz = id => httpService.get(`/room-quiz/${id}`)
const getMy = () => httpService.get('/room-my')
const getOpened = () => httpService.get('/room-opened')
const getAssociated = () => httpService.get('/room-associated')
const save = q => httpService.post('/room', q)
const changeStatus = (id, status) => httpService.put('/room-status', { id, status })
const associate = (id, associate) => httpService.put('/room-associate', { id, associate })
const remove = id => httpService.delete(`/room/${id}`)

export default {
  get,
  getQuiz,
  getMy,
  getOpened,
  getAssociated,
  save,
  changeStatus,
  associate,
  remove
}