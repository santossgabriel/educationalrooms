import notification from '../controllers/notification'
import { asyncErrorHandler } from '../helpers/error'

export default (app) => {
  app.get('/api/notification', asyncErrorHandler(notification.getAll))
  app.delete('/api/notification/:id', asyncErrorHandler(notification.remove))
  app.delete('/api/notification', asyncErrorHandler(notification.removeAll))
  app.put('/api/notification-read', asyncErrorHandler(notification.maskAsRead))
}