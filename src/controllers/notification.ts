import db from '../infra/db/models/index'
import { throwValidationError } from '../helpers/error'
import { Languages } from '../helpers/utils'
import { AppRequest, AppResponse } from '../models/app.model'

const { sequelize, Notification } = db
const { EN, BR } = Languages

export const NotificationTypes = {
  IN_ROOM: 'IN_ROOM',
  OUT_ROOM: 'OUT_ROOM',
  ROOM_STARTED: 'ROOM_START',
  ROOM_ENDED: 'ROOM_ENDED',
  ROOM_REMOVED: 'ROOM_REMOVED',
  ROOM_CLOSED: 'ROOM_CLOSED'
}

export default {

  getAll: async (req: AppRequest, res: AppResponse) => {
    res.json(await Notification.findAll({
      where: {
        userId: req.claims.id
      },
      order: sequelize.literal('"createdAt" desc')
    }))
  },

  remove: async (req: AppRequest, res: AppResponse) => {
    const { id } = req.params
    const notification = await Notification.findOne({ where: { id: id } })

    if (!notification)
      throwValidationError({
        [BR]: 'A notificação não existe.',
        [EN]: 'Notification does not exist.'
      })

    if (notification.userId !== req.claims.id)
      throwValidationError({
        [BR]: 'Sem permissão para remover esta notificação.',
        [EN]: 'Not allowed to remove this notification.'
      })

    await Notification.destroy({ where: { id: id } })
    res.json({ message: { [BR]: 'Removido com sucesso.', [EN]: 'Removed successfully.' } })
  },

  removeAll: async (req: AppRequest, res: AppResponse) => {
    await Notification.destroy({ where: { userId: req.claims.id } })
    res.json({ message: { [BR]: 'Removidas com sucesso.', [EN]: 'Removed successfully.' } })
  },

  maskAsRead: async (req: AppRequest, res: AppResponse) => {
    await Notification.update({ read: true }, { where: { userId: req.claims.id } })
    res.json({
      message: {
        [BR]: 'Todas as notificações foram marcadas como lidas.',
        [EN]: 'All notifications were marked as read.'
      }
    })
  }
}