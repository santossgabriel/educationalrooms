import db from '../infra/db/models/index'

const { Notification } = db

export default {

  getAll: async (req, res) => {
    res.json(await Notification.findAll({ where: { userId: req.claims.id } }))
  }
}