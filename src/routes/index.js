import question from './question'
import account from './account'
import log from './log'
export default (app) => {
  question(app)
  account(app)
  log(app)
}
