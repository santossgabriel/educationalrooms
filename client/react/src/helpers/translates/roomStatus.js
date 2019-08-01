import Languages  from './languages'

const { PT_BR, EN_US } = Languages

export const RoomStatus = {
  CLOSED: {
    [EN_US]: 'Closed',
    [PT_BR]: 'Fechada'
  },
  OPENED: {
    [EN_US]: 'Opened',
    [PT_BR]: 'Aberta'
  },
  STARTED: {
    [EN_US]: 'Started',
    [PT_BR]: 'Iniciada'
  },
  ENDED: {
    [EN_US]: 'Ended',
    [PT_BR]: 'Finalizada'
  }
}