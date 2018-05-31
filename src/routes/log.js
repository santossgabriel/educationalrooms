import log from '../controllers/log'
import { asyncErrorHandler } from '../helpers/error'

export default (app) => {
  app.get('/api/log', asyncErrorHandler(log.getAll))
}