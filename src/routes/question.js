import question from '../controllers/question'

export default (app) => {
  app.get('/api/question', question.getByUser)
  app.post('/api/question', question.create)
  app.put('/api/question', question.update)
}