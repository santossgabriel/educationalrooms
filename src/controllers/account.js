import jwt from 'jsonwebtoken'
import sha1 from 'sha1'

import { throwValidationError, throwAuthError } from '../helpers/error'
import config from '../infra/config'
import sequelize from '../infra/db/models/index'
import { validateAccount } from '../helpers/validation'

const { User } = sequelize

export const isMobile = async (userId) => {
  return await User.findOne({ attributes: ['mobile'], where: { id: userId } })
}

export default {
  getUserData: async (req, res) => {
    const user = await User.findOne({ where: { id: req.claims.id } })
    res.json({
      name: user.name,
      email: user.email,
      type: user.type,
      picture: user.picture,
      google: user.google
    })
  },

  getToken: async (req, res) => {
    const { email, password, mobile } = req.body
    const user = await User.findOne({ where: { email: email } })
    if (!user || !password || user.password !== sha1(password))
      throwAuthError('Credenciais inválidas.')
    const token = jwt.sign({ id: user.id, type: user.type }, config.SECRET, { expiresIn: 60 * 60 * 24 * 360 })
    if (mobile)
      User.update({ mobile: true }, { where: { email: email } })
    res.json({ token: token, message: 'Token gerado com sucesso.' })
  },

  create: async (req, res) => {
    let account = req.body
    validateAccount(account)
    const userDB = await User.findOne({
      where: { email: account.email }
    })

    if (userDB)
      throwValidationError('Este email já está em uso.')

    account.password = sha1(account.password)
    account.createdAt = new Date()
    account.updatedAt = new Date()
    const user = await User.create(account)
    const token = jwt.sign({ id: user.id, type: user.type }, config.SECRET, { expiresIn: 60 * 60 * 24 * 360 })
    res.json({ token: token, message: 'Criado com sucesso.' })
  },

  update: async (req, res) => {
    const account = req.body

    if (!account || !account.email || !/.{3,}@.{3,}/.test(account.email))
      throwValidationError('Email inválido.')

    if (!account.name || account.name.length < 3)
      throwValidationError('O nome deve possuir pelo menos 3 caracteres.')

    const userDB = await User.findOne({
      where: sequelize.sequelize.and(
        { email: account.email },
        {
          id: {
            [sequelize.sequelize.Op.ne]: req.claims.id
          }
        })
    })

    if (userDB)
      throwValidationError('Este email já está em uso.')
    await User.update({
      email: account.email,
      name: account.name,
      updatedAt: new Date()
    }, { where: { id: req.claims.id } })
    res.json({ message: 'Atualizado com sucesso.' })
  }
}