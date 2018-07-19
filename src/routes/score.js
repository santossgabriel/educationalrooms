import score from '../controllers/score'
import { asyncErrorHandler } from '../helpers/error'

export default (app) => {
  app.get('/api/score', asyncErrorHandler(score.getScores))
}