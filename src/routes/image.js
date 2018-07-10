import image from '../controllers/image'
import { asyncErrorHandler } from '../helpers/error'

export default (app) => {
  app.get('/api/image/:name', asyncErrorHandler(image.get))
  app.get('/api/imageall', asyncErrorHandler(image.getAllImageNames))
  app.post('/api/image', asyncErrorHandler(image.createImagePerfil))
}