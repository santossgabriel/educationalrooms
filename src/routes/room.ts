import { Application } from 'express'
import room from '../controllers/room'
import { asyncErrorHandler } from '../helpers/error'

export default (app: Application) => {
  app.get('/api/room/:id', asyncErrorHandler(room.get))
  app.get('/api/room-my', asyncErrorHandler(room.getMy))
  app.get('/api/room-associated', asyncErrorHandler(room.getMyAssociated))
  app.get('/api/room-opened', asyncErrorHandler(room.getOpened))
  app.get('/api/room-quiz/:id', asyncErrorHandler(room.getQuiz))
  app.post('/api/room', asyncErrorHandler(room.save))
  app.put('/api/room-associate', asyncErrorHandler(room.associate))
  app.put('/api/room-status', asyncErrorHandler(room.changeStatus))
  app.delete('/api/room/:id', asyncErrorHandler(room.remove))
}