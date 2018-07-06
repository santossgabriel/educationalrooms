import room from '../controllers/room'
import { asyncErrorHandler } from '../helpers/error'

export default (app) => {
  app.get('/api/room/:id', asyncErrorHandler(room.get))
  app.get('/api/room-my', asyncErrorHandler(room.getMy))
  app.get('/api/room-associated', asyncErrorHandler(room.getMyAssociated))
  app.get('/api/room-available', asyncErrorHandler(room.getAvaliables))  
  app.post('/api/room', asyncErrorHandler(room.save))
  app.put('/api/room-enter/:id', asyncErrorHandler(room.enter))  
  app.delete('/api/room/:id', asyncErrorHandler(room.remove))
}