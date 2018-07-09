import account from '../controllers/account'
import google from '../controllers/google'
import { asyncErrorHandler } from '../helpers/error'

export default (app) => {
  app.get('/api/account', asyncErrorHandler(account.getUserData))
  app.post('/api/token', asyncErrorHandler(account.getToken))
  app.post('/api/token-google', asyncErrorHandler(google.googleToken))
  app.post('/api/account', asyncErrorHandler(account.create))
  app.put('/api/account', asyncErrorHandler(account.update))
}