module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Answer', [
      // Questão 2
    {
      questionId: 2,
      description: 'teste1',
      correct: false,
      classification: 'A'
    }, {
      questionId: 2,
      description: 'teste2',
      correct: true,
      classification: 'B'
    }, {
      questionId: 2,
      description: 'teste3',
      correct: false,
      classification: 'C'
    }, {
      questionId: 2,
      description: 'teste4',
      correct: false,
      classification: 'D'
    },

    // Questão 7
    {
      questionId: 7,
      description: 'teste1',
      correct: false,
      classification: 'A'
    }, {
      questionId: 7,
      description: 'teste2',
      correct: true,
      classification: 'B'
    }, {
      questionId: 7,
      description: 'teste3',
      correct: false,
      classification: 'C'
    }, {
      questionId: 7,
      description: 'teste4',
      correct: false,
      classification: 'D'
    },

    // Questão 8
    {
      questionId: 8,
      description: 'teste1',
      correct: false,
      classification: 'A'
    }, {
      questionId: 8,
      description: 'teste2',
      correct: true,
      classification: 'B'
    }, {
      questionId: 8,
      description: 'teste3',
      correct: false,
      classification: 'C'
    }, {
      questionId: 8,
      description: 'teste4',
      correct: false,
      classification: 'D'
    },

    // Questão 9
    {
      questionId: 9,
      description: 'teste1',
      correct: false,
      classification: 'A'
    }, {
      questionId: 9,
      description: 'teste2',
      correct: true,
      classification: 'B'
    }, {
      questionId: 9,
      description: 'teste3',
      correct: false,
      classification: 'C'
    }, {
      questionId: 9,
      description: 'teste4',
      correct: false,
      classification: 'D'
    },

    // Questão 10
    {
      questionId: 10,
      description: 'teste1',
      correct: false,
      classification: 'A'
    }, {
      questionId: 10,
      description: 'teste2',
      correct: true,
      classification: 'B'
    }, {
      questionId: 10,
      description: 'teste3',
      correct: false,
      classification: 'C'
    }, {
      questionId: 10,
      description: 'teste4',
      correct: false,
      classification: 'D'
    },

    // Questão 11
    {
      questionId: 11,
      description: 'teste1',
      correct: false,
      classification: 'A'
    }, {
      questionId: 11,
      description: 'teste2',
      correct: true,
      classification: 'B'
    }, {
      questionId: 11,
      description: 'teste3',
      correct: false,
      classification: 'C'
    }, {
      questionId: 11,
      description: 'teste4',
      correct: false,
      classification: 'D'
    },

    // Questão 12
    {
      questionId: 12,
      description: 'teste1',
      correct: false,
      classification: 'A'
    }, {
      questionId: 12,
      description: 'teste2',
      correct: true,
      classification: 'B'
    }, {
      questionId: 12,
      description: 'teste3',
      correct: false,
      classification: 'C'
    }, {
      questionId: 12,
      description: 'teste4',
      correct: false,
      classification: 'D'
    }

  ])
  }
}