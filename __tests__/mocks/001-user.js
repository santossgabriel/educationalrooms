const sha1 = require('sha1')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('User', [{
      name: 'question_mock_1', // id = 1
      email: 'questionmock1@mail.com',
      password: sha1('123qwe'),
      createdAt: new Date(),
      updatedAt: new Date(),
      mobile: false
    }, {
      name: 'question_mock_2', // id = 2
      email: 'questionmock2@mail.com',
      password: sha1('123qwe'),
      createdAt: new Date(),
      updatedAt: new Date(),
      mobile: false
    }, {
      name: 'question_mock_3', // id = 3
      email: 'questionmock3@mail.com',
      password: sha1('123qwe'),
      createdAt: new Date(),
      updatedAt: new Date(),
      mobile: false
    }, {
      name: 'question_mock_4', // id = 4
      email: 'questionmock4@mail.com',
      password: sha1('123qwe'),
      type: 'A',
      createdAt: new Date(),
      updatedAt: new Date(),
      mobile: false
    }, {
      name: 'test_sync', // id = 5
      email: 'test_sync@mail.com',
      password: sha1('123qwe'),
      createdAt: new Date(),
      updatedAt: new Date(),
      mobile: false
    }, {
      name: 'test_room', // id = 6
      email: 'test_room@mail.com',
      password: sha1('123qwe'),
      createdAt: new Date(),
      updatedAt: new Date(),
      mobile: false
    }])
  }
}