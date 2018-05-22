import jwt from 'jsonwebtoken'

import { throwValidationError, handlerError, throwAuthError } from '../helpers/error'
import config from '../infra/config'
import sequelize from '../infra/db/models/index'
import { validateAccount } from '../helpers/validation'

const { User } = sequelize

export default {
  getUserData: async (req, res) => {
    const user = await User.findOne({ where: { id: req.claims.id } })
    const userResult = {
      name: user.name,
      email: user.email
    }
    res.json(userResult)
  },

  getToken: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email: email } })
      if (!user || user.password !== password)
        throwAuthError('Credenciais inválidas.')
      const token = jwt.sign({ id: user.id }, config.SECRET, { expiresIn: 60 * 60 * 24 })
      res.json({ token: token, message: 'Token gerado com sucesso.' })
    } catch (ex) {
      handlerError(ex, res)
    }
  },

  create: async (req, res) => {
    const account = req.body
    try {
      validateAccount(account)
      const userDB = await User.findOne({
        where: sequelize.sequelize.or(
          { email: account.email },
          { name: account.name })
      })

      if (userDB) {
        if (userDB.name === account.name)
          throwValidationError('Este nome já está em uso.')
        throwValidationError('Este email já está em uso.')
      }
      const user = await User.create(account)
      const token = jwt.sign({ id: user.id }, config.SECRET, { expiresIn: 60 * 60 * 24 })
      res.json({ token: token, message: 'Criado com sucesso.' })
    } catch (ex) {
      handlerError(ex, res)
    }
  },

  update: async (req, res) => {
    const account = req.body
    try {
      validateAccount(account)

      const userDB = await User.findOne({
        where: sequelize.sequelize.and(
          sequelize.sequelize.or(
            { email: account.email },
            { name: account.name }),
          {
            id: {
              [sequelize.sequelize.Op.ne]: req.claims.id
            }
          })
      })

      if (userDB) {
        if (userDB.name === account.name)
          throwValidationError('Este nome já está em uso.')
        throwValidationError('Este email já está em uso.')
      }

      await User.update(account, { where: { id: req.claims.id } })
      res.json({ message: 'Atualizado com sucesso.' })
    } catch (ex) {
      handlerError(ex, res)
    }
  }
}