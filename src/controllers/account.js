import jwt from 'jsonwebtoken'
import sha1 from 'sha1'

import { throwValidationError, handlerError, throwAuthError } from '../helpers/error'
import config from '../infra/config'
import sequelize from '../infra/db/models/index'
import { validateAccount } from '../helpers/validation'

const { User } = sequelize

export default {
  getUserData: async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.claims.id } })
      const userResult = {
        name: user.name,
        email: user.email
      }
      res.json(userResult)
    } catch (ex) {
      handlerError(ex, res, req)
    }
  },

  getToken: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email: email } })
      if (!user || !password || user.password !== sha1(password))
        throwAuthError('Credenciais inválidas.')
      const token = jwt.sign({ id: user.id }, config.SECRET, { expiresIn: 60 * 60 * 24 })
      res.json({ token: token, message: 'Token gerado com sucesso.' })
    } catch (ex) {
      handlerError(ex, res, req)
    }
  },

  create: async (req, res) => {
    let account = req.body
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
      account.password = sha1(account.password)
      const user = await User.create(account)
      const token = jwt.sign({ id: user.id }, config.SECRET, { expiresIn: 60 * 60 * 24 })
      res.json({ token: token, message: 'Criado com sucesso.' })
    } catch (ex) {
      handlerError(ex, res, req)
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
      const user = await User.findOne({ where: { id: req.claims.id } })
      if (!account.password || user.password !== sha1(account.password))
        throwValidationError('A senha informada é diferente da senha atual.')
      await User.update(account, { where: { id: req.claims.id } })
      res.json({ message: 'Atualizado com sucesso.' })
    } catch (ex) {
      handlerError(ex, res, req)
    }
  }
}