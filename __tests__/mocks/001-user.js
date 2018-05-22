module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('User', [{
      name: 'question_mock_1',
      email: 'questionmock1@mail.com',
      password: '123qwe'
    }, {
      name: 'question_mock_2',
      email: 'questionmock2@mail.com',
      password: '123qwe'
    }])
  }
}