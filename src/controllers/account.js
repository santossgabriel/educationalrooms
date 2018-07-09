import jwt from 'jsonwebtoken'
import sha1 from 'sha1'

import { throwValidationError, throwAuthError } from '../helpers/error'
import config from '../infra/config'
import sequelize from '../infra/db/models/index'
import { validateAccount } from '../helpers/validation'
import { OAuth2Client } from 'google-auth-library'

const auth = new OAuth2Client('177211292368-ro5aar6klvjkustdlga8616m8cds2iru.apps.googleusercontent.com', config.GOOGLE_SECRET)

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

    if (userDB) {
      if (userDB.name === account.name)
        throwValidationError('Este nome já está em uso.')
      throwValidationError('Este email já está em uso.')
    }
    account.password = sha1(account.password)
    account.createdAt = new Date()
    account.updatedAt = new Date()
    const user = await User.create(account)
    const token = jwt.sign({ id: user.id, type: user.type }, config.SECRET, { expiresIn: 60 * 60 * 24 * 360 })
    res.json({ token: token, message: 'Criado com sucesso.' })
  },

  update: async (req, res) => {
    const account = req.body
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
    await User.update({
      email: account.email,
      name: account.name,
      updatedAt: new Date()
    }, { where: { id: req.claims.id } })
    res.json({ message: 'Atualizado com sucesso.' })
  },

  googleToken: async (req, res) => {
    const { googleToken, mobile } = req.body
    const result = await auth.verifyIdToken({ idToken: googleToken })
    const payload = result.getAttributes().payload

    const user = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture
    }

    let userDB = await User.findOne({
      where: { email: user.email }
    })

    if (!userDB) {
      user.createdAt = new Date()
      user.updatedAt = new Date()
      user.password = sha1(user.email)
      user.type = 'U'
      user.mobile = mobile ? true : false
      user.google = true
      userDB = await User.create(user)
    }

    const token = jwt.sign({ id: userDB.id, type: userDB.type }, config.SECRET, { expiresIn: 60 * 60 * 24 * 360 })
    res.json({ token: token, message: 'Criado com sucesso.' })
  }
}