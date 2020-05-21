import jwt from 'jsonwebtoken'
import config from '../infra/config'

export const cloneObject = (obj) => {
  if (obj === null || 'object' != typeof obj)
    return obj
  let cloned = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      cloned[key] = obj[key]
  }
  return cloned
}

export const Languages = {
  EN: 'en',
  BR: 'br'
}

export const generateToken = user => {
  return jwt.sign({
    id: user.id,
    type: user.type,
    name: user.name
  },
    config.SECRET,
    { expiresIn: 60 * 60 * 24 * 360 })
}