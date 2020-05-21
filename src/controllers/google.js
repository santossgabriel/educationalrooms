import sha1 from 'sha1'

import config from '../infra/config'
import sequelize from '../infra/db/models/index'
import { OAuth2Client } from 'google-auth-library'
import { Languages, generateToken } from '../helpers/utils'

const auth = new OAuth2Client('177211292368-ro5aar6klvjkustdlga8616m8cds2iru.apps.googleusercontent.com', config.GOOGLE_SECRET)

const { User } = sequelize
const { EN, BR } = Languages

export default {

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
    const token = generateToken({ id: userDB.id, type: userDB.type, name: user.name })

    res.json({
      token: token, message: {
        [EN]: 'Token successfully generated',
        [BR]: 'Token gerado com sucesso.'
      }
    })
  }
}