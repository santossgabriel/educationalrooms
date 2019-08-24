import score from '../controllers/score'
import { asyncErrorHandler } from '../helpers/error'

export default app => {
  app.get('/api/score', asyncErrorHandler(score.getScores))
  app.get('/api/score-graph', asyncErrorHandler(score.getScoresGraph))
}