import jwt from 'jsonwebtoken'
import sha1 from 'sha1'

import { throwValidationError, throwAuthError } from '../helpers/error'
import config from '../infra/config'
import sequelize from '../infra/db/models/index'
import { validateAccount } from '../helpers/validation'
import { Languages } from '../helpers/utils'

const { User } = sequelize
const { EN, BR } = Languages

const generateToken = user => {
  return jwt.sign({
    id: user.id,
    type: user.type,
    name: user.name
  },
    config.SECRET,
    { expiresIn: 60 * 60 * 24 * 360 })
}

export default {
  getUserData: async (req, res) => {
    const user = await User.findOne({ where: { id: req.claims.id } })
    res.json(user ? {
      id: req.claims.id,
      name: user.name,
      email: user.email,
      type: user.type,
      picture: user.picture,
      google: user.google
    } : null)
  },

  getToken: async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })
    if (!user || !password || user.password !== sha1(password))
      throwAuthError({ [EN]: 'Invalid credentials.', [BR]: 'Credenciais inválidas.' })
    const token = generateToken(user)
    res.json({
      token: token,
      message: {
        [EN]: 'Token successfully generated',
        [BR]: 'Token gerado com sucesso.'
      }
    })
  },

  create: async (req, res) => {
    let account = req.body
    validateAccount(account)
    const userDB = await User.findOne({
      where: {
        [sequelize.sequelize.Op.or]: [
          { email: account.email },
          { name: account.name }
        ]
      }
    })

    if (userDB) {
      if (userDB.email === account.email)
        throwValidationError({ [BR]: 'Este email já está em uso.', [EN]: 'This email is already in use.' })
      throwValidationError({ [BR]: 'Este nome já está em uso.', [EN]: 'This name is already in use.' })
    }

    account.password = sha1(account.password)
    account.createdAt = new Date()
    account.updatedAt = new Date()
    const user = await User.create(account)
    const token = generateToken(user)
    res.json({
      token: token, message: {
        [BR]: 'Criado com sucesso.', [EN]: 'Created successfully'
      }
    })
  },

  update: async (req, res) => {
    const { name, email, changePassword, currentPassword, newPassword } = req.body || {}

    const account = { name, email, updatedAt: new Date() }

    if (changePassword) {
      if (!currentPassword)
        throwValidationError({
          [BR]: 'A senha atual é inválida.',
          [EN]: 'Invalid current password.'
        })
      account.password = newPassword
    }

    validateAccount(account, true)

    let userDB = await User.findOne({
      where: sequelize.sequelize.and(
        {
          [sequelize.sequelize.Op.or]: [
            { email: account.email },
            { name: account.name }
          ]
        },
        {
          id: {
            [sequelize.sequelize.Op.ne]: req.claims.id
          }
        })
    })

    if (userDB) {
      if (userDB.email === account.email)
        throwValidationError({ [BR]: 'Este email já está em uso.', [EN]: 'This email is already in use.' })
      throwValidationError({ [BR]: 'Este nome já está em uso.', [EN]: 'This name is already in use.' })
    }


    if (changePassword) {
      userDB = await User.findOne({ where: { id: req.claims.id } })
      if (sha1(currentPassword) !== userDB.password)
        throwValidationError({
          [BR]: 'A senha atual está incorreta.',
          [EN]: 'Current password is wrong.'
        })
      account.password = sha1(account.password)
    }

    await User.update(account, { where: { id: req.claims.id } })
    account.id = req.claims.id
    const token = generateToken(account)
    res.json({
      token: token,
      message: {
        [BR]: 'Atualizado com sucesso.',
        [EN]: 'Updated successfully.'
      }
    })
  }
}