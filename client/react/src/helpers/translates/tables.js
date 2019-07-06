import { EN_US, PT_BR } from './languages'

const Name = { [PT_BR]: 'Nome', [EN_US]: 'Name' },
  Status = { [PT_BR]: 'Situação', [EN_US]: 'Status' },
  Duration = { [PT_BR]: 'Duração', [EN_US]: 'Duration' },
  Questions = { [PT_BR]: 'Questões', [EN_US]: 'Questions' },
  Users = { [PT_BR]: 'Usuários', [EN_US]: 'Users' }

export const MyQuestionsTable = {
  Area: { [PT_BR]: 'Área', [EN_US]: 'Area' },
  Difficulty: { [PT_BR]: 'Dificuldade', [EN_US]: 'Difficulty' },
  Description: { [PT_BR]: 'Descrição', [EN_US]: 'Description' },
  Answers: { [PT_BR]: 'Respostas', [EN_US]: 'Answers' },
  Shared: { [PT_BR]: 'Compartilhada?', [EN_US]: 'Shared?' },
  CreateQuestion: { [PT_BR]: 'Criar Questão', [EN_US]: 'Create Question' },
  Order: { [PT_BR]: 'Ordem', [EN_US]: 'Order' },
  Points: { [PT_BR]: 'Pontos', [EN_US]: 'Points' },
}

export const MyRoomsTable = {
  CreateRoom: { [PT_BR]: 'Criar Sala', [EN_US]: 'Create Room' },
  Name,
  Status,
  Users,
  Questions,
  Duration
}

export const OpenedRoomTable = {
  Owner: { [PT_BR]: 'Dono', [EN_US]: 'Owner' },
  Name,
  Users,
  Questions,
  Duration,
  Enter: { [PT_BR]: 'Participar', [EN_US]: 'Enter' },
  Leave: { [PT_BR]: 'Deixar', [EN_US]: 'Leave' }
}

export const AssociatedRoomTable = {
  Name,
  Status,
  Score: { [PT_BR]: 'Pontuação', [EN_US]: 'Scores' },
  Duration,
  Actions: { [PT_BR]: 'Participar', [EN_US]: 'Enter' }
}