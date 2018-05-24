module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Answer', [{
      questionId: 2,
      description: 'teste1',
      correct: false
    }, {
      questionId: 2,
      description: 'teste2',
      correct: true
    }, {
      questionId: 2,
      description: 'teste3',
      correct: false
    }, {
      questionId: 2,
      description: 'teste4',
      correct: false
    }, {
      questionId: 2,
      description: 'teste5',
      correct: false
    }])
  }
}