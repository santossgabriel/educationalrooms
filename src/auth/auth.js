import jwt from 'jsonwebtoken'
import config from '../infra/config'

import { authError } from '../helpers/error'

const isFree = (req) => {
  const {path, method} = req
  return path === '/' || path === '/token' || (path === '/api/account' && method === 'POST')
}

export default (req, res, next) => {
  if (isFree(req))
    return next()
  const { token } = req.headers
  if (!token)
    return authError(res, 'Forneça o token.')
  jwt.verify(token, config.SECRET, (err, data) => {
    if (err)
      return authError(res, err)
    req.claims = data
    next()
  })
}