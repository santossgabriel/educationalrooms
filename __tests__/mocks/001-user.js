const sha1 = require('sha1')

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('User', [{
      name: 'question_mock_1',
      email: 'questionmock1@mail.com',
      password: sha1('123qwe')
    }, {
      name: 'question_mock_2',
      email: 'questionmock2@mail.com',
      password: sha1('123qwe')
    }, {
      name: 'question_mock_3',
      email: 'questionmock3@mail.com',
      password: sha1('123qwe')
    }])
  }
}