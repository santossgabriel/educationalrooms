import questionController from '../controllers/question'

export default (app) => {
  app.post('/question', questionController.create)
  app.put('/question', questionController.update)
}