import question from './question'
import account from './account'
import log from './log'
import room from './room'
import image from './image'
export default (app) => {
  question(app)
  account(app)
  log(app)
  room(app)
  image(app)
}
