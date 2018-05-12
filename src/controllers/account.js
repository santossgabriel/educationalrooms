import jwt from 'jsonwebtoken'

import { throwValidationError, handlerError, authError } from '../helpers/error'
import config from '../infra/config'
import { User } from '../infra/db/sequelize'

const validate = (account) => {

  if (!account)
    throwValidationError('Usuário inválido.')

  const { email, password } = account

  if (!email)
    throwValidationError('Email inválido.')

  if (!password || password.length < 6)
    throwValidationError('A senha deve possuir pelo menos 6 caracteres.')
}

export default {
  getToken: (req, res) => {
    const { email, password } = req.body
    User.findOne({ where: { email: email } })
      .then(result => {
        if (result && result.password === password) {
          const token = jwt.sign({ id: result.id }, config.SECRET, { expiresIn: 60 * 60 * 24 })
          res.json({ token: token })
        } else {
          authError(res, 'Email ou senha inválidos.')
        }
      }).catch(err => handlerError(err, res))
  },

  create: (req, res) => {
    const account = req.body
    try {
      validate(account)
    } catch (ex) {
      handlerError(ex, res)
    }
  },

  update: (req, res) => {
    const account = req.body
    try {
      validate(account)
    } catch (ex) {
      handlerError(ex, res)
    }
  }
}