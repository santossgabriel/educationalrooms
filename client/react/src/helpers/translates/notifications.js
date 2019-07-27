import { NotificationTypes, } from 'helpers/constants'
import { EN_US as EN, PT_BR as BR } from 'helpers/translates/languages'

export const notificationMessage = {
  [NotificationTypes.IN_ROOM]: {
    [EN]: 'Came into the room.',
    [BR]: 'Entrou na sala.'
  },
  [NotificationTypes.OUT_ROOM]: {
    [EN]: 'Leave the room.',
    [BR]: 'Saiu da sala.'
  },
  [NotificationTypes.ROOM_CLOSED]: {
    [EN]: 'was closed.',
    [BR]: 'foi fechada.'
  },
  [NotificationTypes.ROOM_ENDED]: {
    [EN]: 'was ended.', [BR]: 'foi finalizada.'
  },
  [NotificationTypes.ROOM_REMOVED]: {
    [EN]: 'Room was removed.',
    [BR]: 'Sala foi removida.'
  },
  [NotificationTypes.ROOM_STARTED]: {
    [EN]: 'was started.',
    [BR]: 'foi iniciada.'
  }
}

export const elapsedTime = {
  seconds: {
    [EN]: 'seconds ago',
    [BR]: 'segundos atrás'
  },
  minutes: {
    [EN]: 'minutes ago',
    [BR]: 'minutos atrás'
  },
  hours: {
    [EN]: 'hours ago',
    [BR]: 'horas atrás'
  },
  days: {
    [EN]: 'days ago',
    [BR]: 'dias atrás'
  }
}