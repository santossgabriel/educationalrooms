import jwt from 'jsonwebtoken'
import config from '../infra/config'

import { authError } from '../helpers/error'

const isFree = (req) => {
  const { path, method } = req
  return path.indexOf('/api/') === -1
    || path === '/api/token-google'
    || path === '/api/token'
    || (path === '/api/account' && method === 'POST')

}

export default (req, res, next) => {
  if (isFree(req))
    return next()
  const { token } = req.headers
  if (!token)
    return authError('Forneça o token.', res, req)
  jwt.verify(token, config.SECRET, (err, data) => {
    if (err)
      return authError(err, res, req)
    req.claims = data
    next()
  })
}