import account from '../controllers/account'

export default (app) => {
  app.post('/token', account.getToken)
  app.post('/api/account', account.create)
  app.put('/api/account', account.update)
  app.get('/api/account', account.getUserData)
}