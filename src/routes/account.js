import account from '../controllers/account'

export default (app) => {
  app.get('/api/account', account.getUserData)
  app.post('/api/token', account.getToken)
  app.post('/api/account', account.create)
  app.put('/api/account', account.update)
}