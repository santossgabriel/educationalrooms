import sha1 from 'sha1'
import { Request, Response } from 'express'
import { Op } from 'sequelize'

import { throwValidationError, throwAuthError } from '../helpers/error'
import sequelize from '../infra/db/models/index'
import { validateAccount } from '../helpers/validation'
import { Languages, generateToken } from '../helpers/utils'
import { AppRequest } from '../models/app.model'
import { AccountModel } from '../models/account.model'

const { User } = sequelize
const { EN, BR } = Languages

export default {
  getUserData: async (req: Request, res: Response) => {
    const user = await User.findOne({ where: { id: (req as any).claims.id } })
    res.json(user ? {
      id: (req as any).claims.id,
      name: user.name,
      email: user.email,
      type: user.type,
      picture: user.picture,
      google: user.google
    } : null)
  },

  getToken: async (req: Request, res: Response) => {
    const authError = { [EN]: 'Invalid credentials.', [BR]: 'Credenciais inválidas.' }
    const { email, password } = req.body || {}
    if (!email || !password)
      throwAuthError(authError)
    const user = await User.findOne({ where: { email: email } })
    if (!user || !password || user.password !== sha1(password))
      throwAuthError(authError)
    const token = generateToken(user)
    res.json({
      token: token,
      message: {
        [EN]: 'Token successfully generated',
        [BR]: 'Token gerado com sucesso.'
      }
    })
  },

  create: async (req: Request, res: Response) => {
    let account = req.body
    validateAccount(account)

    const userDB = await User.findOne({
      where: { email: account.email }
    })

    if (userDB)
      throwValidationError({ [BR]: 'Este email já está em uso.', [EN]: 'This email is already in use.' })

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

  update: async (req: AppRequest, res: Response) => {

    const { name, email, changePassword, currentPassword, newPassword } = req.body || {}

    const account = new AccountModel(undefined, name, email, undefined, new Date())

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
        { email: account.email },
        {
          id: {
            [Op.ne]: (req as any).claims.id
          }
        })
    })

    if (userDB) {
      throwValidationError({ [BR]: 'Este email já está em uso.', [EN]: 'This email is already in use.' })
    }


    if (changePassword) {
      userDB = await User.findOne({ where: { id: req.claims.id } })
      if (sha1(currentPassword) !== userDB.password)
        throwValidationError({
          [BR]: 'A senha atual está incorreta.',
          [EN]: 'Current password is wrong.'
        })
      account.password = sha1(account.password || '')
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