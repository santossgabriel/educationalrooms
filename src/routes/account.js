import account from '../controllers/account'

export default (app) => {
  app.post('/token', account.getToken)
  app.get('/api/account', account.getData)
  app.post('/api/account', account.create)
  app.put('/api/account', account.update)
}