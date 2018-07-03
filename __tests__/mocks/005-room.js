module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Room', [{
      name: 'test_room', // id = 1
      createdAt: new Date(),
      userId: 6,
      secondsStep: 0
    }, {
      name: 'test_room_2', // id = 2
      createdAt: new Date('01/01/2018'),
      endedAt: new Date('02/02/2018'),
      secondsStep: 8,
      userId: 6
    }, {
      name: 'test_room_3', // id = 3
      createdAt: new Date('01/01/2018'),
      secondsStep: 8,
      userId: 1
    }])
  }
}