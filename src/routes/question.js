import question from '../controllers/question'

export default (app) => {
  app.get('/api/question', question.getByUser)
  app.get('/api/question/:id', question.getById)
  app.post('/api/question', question.create)
  app.put('/api/question', question.update)
  app.delete('/api/question/:id', question.remove)
}