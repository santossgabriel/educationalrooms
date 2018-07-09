import account from '../controllers/account'
import { asyncErrorHandler } from '../helpers/error'

export default (app) => {
  app.get('/api/account', asyncErrorHandler(account.getUserData))
  app.post('/api/token', asyncErrorHandler(account.getToken))
  app.post('/api/token-google', asyncErrorHandler(account.googleToken))
  app.post('/api/account', asyncErrorHandler(account.create))
  app.put('/api/account', asyncErrorHandler(account.update))
}