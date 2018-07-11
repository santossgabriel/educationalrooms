import notification from '../controllers/notification'
import { asyncErrorHandler } from '../helpers/error'

export default (app) => {
  app.get('/api/notification', asyncErrorHandler(notification.getAll))
}