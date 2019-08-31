import { PT_BR, EN_US } from './languages'
import { RoomStatus } from '../constants'

export const Question = {
  ConfirmExclusionTitle: {
    [PT_BR]: 'Tem certeza que deseja excluir a questão ?',
    [EN_US]: 'Are you sure you want to remove the question?'
  },
  AddQuestions: {
    [PT_BR]: 'Adicionar Questões',
    [EN_US]: 'Add Questions'
  }
}

export const Room = {
  NoQuestions: {
    [PT_BR]: 'A sala ainda não possui questões.',
    [EN_US]: 'The room does not have questions yet.'
  },
  TotalTime: {
    [PT_BR]: 'O tempo de duração da sala é de {0} segundos.',
    [EN_US]: 'The room duration time is {0} seconds.'
  },
  OrderBy: {
    [PT_BR]: 'Ordenar questões por:',
    [EN_US]: 'Sor questions by:'
  },
  Status: {
    [RoomStatus.CLOSED]: {
      [PT_BR]: 'FECHADA',
      [EN_US]: 'CLOSED'
    },
    [RoomStatus.OPENED]: {
      [PT_BR]: 'ABERTA',
      [EN_US]: 'OPENED'
    },
    [RoomStatus.STARTED]: {
      [PT_BR]: 'INICIADA',
      [EN_US]: 'STARTED'
    },
    [RoomStatus.ENDED]: {
      [PT_BR]: 'FINALIZADA',
      [EN_US]: 'ENDED'
    }
  },
  CreatedAt: {
    [PT_BR]: 'Criada em: ',
    [EN_US]: 'Created at :'
  },
  OpenedAt: {
    [PT_BR]: 'Aberta em: ',
    [EN_US]: 'Opened at: '
  },
  StartedAt: {
    [PT_BR]: 'Iniciada em: ',
    [EN_US]: 'Started at: '
  },
  EndedAt: {
    [PT_BR]: 'Finalizada em: ',
    [EN_US]: 'Ended at: '
  },
  OpenRoom: {
    [PT_BR]: 'Abrir Sala',
    [EN_US]: 'Open Room'
  },
  StartRoom: {
    [PT_BR]: 'Iniciar Sala',
    [EN_US]: 'Start Room'
  },
  EndRoom: {
    [PT_BR]: 'Finalizar Sala',
    [EN_US]: 'Finish Room'
  }
}

export const UserAccount = {
  Name: {
    [PT_BR]: 'Nome',
    [EN_US]: 'Name'
  },
  CurrentPassword: {
    [PT_BR]: 'Senha Atual',
    [EN_US]: 'Current Password'
  },
  NewPassword: {
    [PT_BR]: 'Nova Senha',
    [EN_US]: 'new Password'
  },
  ConfirmPassword: {
    [PT_BR]: 'Confirme a senha',
    [EN_US]: 'Confirm Password'
  },
  Title: {
    [PT_BR]: 'Dados da Conta',
    [EN_US]: 'Account'
  },
  ChangePassword: {
    [PT_BR]: 'Alterar Senha',
    [EN_US]: 'Change Password'
  }
}

export const Home = {
  Participations: {
    [PT_BR]: 'Participações',
    [EN_US]: 'Participations'
  },
  Scores: {
    [PT_BR]: 'Total de pontos já realizados',
    [EN_US]: 'Total scores already made'
  },
  ScorePossible: {
    [PT_BR]: 'Pontos possíveis',
    [EN_US]: 'Score possible'
  },
  ScoreMade: {
    [PT_BR]: 'Pontos realizados',
    [EN_US]: 'Score made'
  }
}