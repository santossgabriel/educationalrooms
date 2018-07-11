import db from '../infra/db/models/index'

const { Notification } = db

export const NotificationTypes = {
  IN_ROOM: 'IN_ROOM',
  OUT_ROOM: 'OUT_ROOM'
}

export default {

  getAll: async (req, res) => {
    res.json(await Notification.findAll({ where: { userId: req.claims.id } }))
  }
}