import { Application } from 'express'

import log from '../controllers/log'
import { asyncErrorHandler } from '../helpers/error'

export default (app: Application) => {
  app.get('/api/log', asyncErrorHandler(log.getAll))
}