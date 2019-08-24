import httpService from './httpService'

const uploadPerfilPicture = file => {
  const data = new FormData()
  data.append('image', file)
  return httpService.post('/image', data)
}

export default {
  uploadPerfilPicture,
}