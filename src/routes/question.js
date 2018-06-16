import question from '../controllers/question'
import { asyncErrorHandler } from '../helpers/error'

export default (app) => {
  app.get('/api/question', asyncErrorHandler(question.getMy))
  app.get('/api/question-others', asyncErrorHandler(question.getOthers))
  app.get('/api/question/:id', asyncErrorHandler(question.getById))
  app.get('/api/categories', asyncErrorHandler(question.getMyCategories))
  app.post('/api/question', asyncErrorHandler(question.create))
  app.put('/api/question-share', asyncErrorHandler(question.share))
  app.post('/api/question-sync', asyncErrorHandler(question.sync))
  app.put('/api/question', asyncErrorHandler(question.update))
  app.delete('/api/question/:id', asyncErrorHandler(question.remove))
}