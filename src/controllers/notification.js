import db from '../infra/db/models/index'
import { throwValidationError } from '../helpers/error'

const { sequelize, Notification } = db

export const NotificationTypes = {
  IN_ROOM: 'IN_ROOM',
  OUT_ROOM: 'OUT_ROOM'
}

export default {
  getAll: async (req, res) => {
    res.json(await Notification.findAll({
      where: {
        userId: req.claims.id
      },
      order: sequelize.literal('"createdAt" desc')
    }))
  },
  remove: async (req, res) => {
    const { id } = req.params
    const notification = await Notification.findOne({ where: { id: id } })

    if (!notification)
      throwValidationError('A notificação não existe.')

    if (notification.userId !== req.claims.id)
      throwValidationError('Sem permissão para remover o item.')

    await Notification.destroy({ where: { id: id } })
    res.json({ message: 'Removido com sucesso.' })
  }
}