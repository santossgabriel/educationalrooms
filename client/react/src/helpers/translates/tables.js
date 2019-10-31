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
  ExportQuestions: { [PT_BR]: 'Exportar', [EN_US]: 'Export' },
  ImportQuestions: { [PT_BR]: 'Importar', [EN_US]: 'Import' },
  Order: { [PT_BR]: 'Ordem', [EN_US]: 'Order' },
  Points: { [PT_BR]: 'Pontos', [EN_US]: 'Points' },
}

export const MyRoomsTable = {
  CreateRoom: { [PT_BR]: 'Criar Sala', [EN_US]: 'Create Room' },
  Name,
  Status,
  Users,
  Questions,
  Duration,
  NoRooms: {
    [PT_BR]: 'Você ainda não criou salas.',
    [EN_US]: 'You haven\'t created rooms yet.'
  }
}

export const OpenedRoomTable = {
  Owner: { [PT_BR]: 'Dono', [EN_US]: 'Owner' },
  Name,
  Users,
  Questions,
  Duration,
  Enter: { [PT_BR]: 'Participar', [EN_US]: 'Enter' },
  Leave: { [PT_BR]: 'Deixar', [EN_US]: 'Leave' },
  NoRooms: {
    [PT_BR]: 'Não há salas abertas no momento.',
    [EN_US]: 'There are currently no open rooms.'
  }
}

export const AssociatedRoomTable = {
  Name,
  Status,
  Score: { [PT_BR]: 'Pontuação', [EN_US]: 'Scores' },
  Duration,
  Actions: { [PT_BR]: 'Participar', [EN_US]: 'Enter' },
  NoRooms: {
    [PT_BR]: 'você não está em nenhuma sala.',
    [EN_US]: 'You are not in any room.'
  },
  OpenQuiz: {
    [PT_BR]: 'abrir quiz',
    [EN_US]: 'open aqui'
  },
  ShowScore: {
    [PT_BR]: 'pontuação',
    [EN_US]: 'scores'
  },
}