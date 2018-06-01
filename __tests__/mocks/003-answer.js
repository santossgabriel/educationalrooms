module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Answer', [{
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
    }])
  }
}