import { Application } from 'express'
import question from '../controllers/question'
import { asyncErrorHandler } from '../helpers/error'

export default (app: Application) => {
  app.get('/api/question', asyncErrorHandler(question.getMy))
  app.get('/api/question-others', asyncErrorHandler(question.getOthers))
  app.get('/api/question/:id', asyncErrorHandler(question.getById))
  app.get('/api/areas', asyncErrorHandler(question.getAreas))
  app.post('/api/question', asyncErrorHandler(question.create))
  app.put('/api/question-share', asyncErrorHandler(question.share))
  app.get('/api/question-get-shared/:id', asyncErrorHandler(question.getShared))
  app.put('/api/question', asyncErrorHandler(question.update))
  app.delete('/api/question/:id', asyncErrorHandler(question.remove))
  app.get('/api/questions-export', asyncErrorHandler(question.exportMyQuestions))
}