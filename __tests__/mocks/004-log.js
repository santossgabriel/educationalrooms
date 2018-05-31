module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Log', [{
      description: 'question_mock_1',
      date: new Date()
    }, {
      description: 'question_mock_2',
      date: new Date()
    }])
  }
}