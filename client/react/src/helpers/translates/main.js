import { PT_BR, EN_US } from './languages'

export const FormErrors = {
  RequiredField: {
    [PT_BR]: 'Este campo é obrigatório',
    [EN_US]: 'This field is required'
  },
  MinLength: (lang, length) => {
    if (lang === PT_BR)
      return `Entre com pelo menos ${length} caracteres`
    else
      return `Enter at least ${length} characters`
  },
  Email: {
    [PT_BR]: 'Email inválido',
    [EN_US]: 'Invalid email'
  },
  PasswordNotMatch: {
    [PT_BR]: 'As senhas não batem',
    [EN_US]: 'Passwords don\'t match'
  }
}

export const AppTitle = {
  [PT_BR]: 'Salas Educacionais',
  [EN_US]: 'Educational Rooms'
}

export const Toolbar = {
  EditAccount: {
    [PT_BR]: 'Editar Conta',
    [EN_US]: 'Edit Account'
  },
  Logout: {
    [PT_BR]: 'Sair',
    [EN_US]: 'Logout'
  }
}

export const AppSymbol = {
  [PT_BR]: 'SE',
  [EN_US]: 'ER'
}

export const Root = {
  Yes: {
    [PT_BR]: 'Sim',
    [EN_US]: 'Yes'
  },
  No: {
    [PT_BR]: 'Não',
    [EN_US]: 'No'
  },
  Prev: {
    [PT_BR]: 'Anterior',
    [EN_US]: 'Previous'
  },
  Next: {
    [PT_BR]: 'Próximo',
    [EN_US]: 'Next'
  },
  Cancel: {
    [PT_BR]: 'Cancelar',
    [EN_US]: 'Cancel'
  },
  Save: {
    [PT_BR]: 'Salvar',
    [EN_US]: 'Save'
  },
  Correct: {
    [PT_BR]: 'Correta?',
    [EN_US]: 'Correct?'
  },
  Remove: {
    [PT_BR]: 'Remover',
    [EN_US]: 'Remove'
  },
  New: {
    [PT_BR]: 'Novo',
    [EN_US]: 'New'
  },
  Edition: {
    [PT_BR]: 'Edição',
    [EN_US]: 'Edition'
  },
  Acquired: {
    [PT_BR]: 'Adquirida',
    [EN_US]: 'Acquired'
  },
  Actions: {
    [PT_BR]: 'Ações',
    [EN_US]: 'Actions'
  },
  Edit: {
    [PT_BR]: 'Editar',
    [EN_US]: 'Edit'
  },
  Scores: {
    [PT_BR]: 'Pontuações',
    [EN_US]: 'Scores'
  }
}

export const MainComponent = {
  QuestionTexts: {
    Questions: {
      [PT_BR]: 'Questões',
      [EN_US]: 'Questions'
    },
    My: {
      [PT_BR]: 'Minhas Questões',
      [EN_US]: 'My Questions'
    },
    Shared: {
      [PT_BR]: 'Questões Compartilhadas',
      [EN_US]: 'Shared Questions'
    }
  },
  RoomTexts: {
    NewEdit: {
      New: {
        [PT_BR]: 'Nova Sala',
        [EN_US]: 'New Room'
      },
      Edit: {
        [PT_BR]: 'Editar Sala',
        [EN_US]: 'Edit Room'
      },
    },
    Rooms: {
      [PT_BR]: 'Salas',
      [EN_US]: 'Rooms'
    },
    My: {
      [PT_BR]: 'Salas Que Criei',
      [EN_US]: 'Rooms I\'ve Created'
    },
    Open: {
      [PT_BR]: 'Salas Abertas',
      [EN_US]: 'Open Rooms'
    },
    Associate: {
      [PT_BR]: 'Participações',
      [EN_US]: 'Associate'
    },
    RoomName: {
      [PT_BR]: 'Nome da sala',
      [EN_US]: 'Room name'
    },
    QuestionTime: {
      [PT_BR]: 'Tempo de cada questão',
      [EN_US]: 'Time of each question'
    }
  },
  ScoreTexts: {
    Scores: {
      [PT_BR]: 'Pontuações',
      [EN_US]: 'Scores'
    }
  },
  NotificationTexts: {
    Notifications: {
      [PT_BR]: 'Notificações',
      [EN_US]: 'Notifications'
    }
  }
}