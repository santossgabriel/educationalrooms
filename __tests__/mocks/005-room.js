module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Room', [{
      name: 'test_room', // id = 1
      createdAt: new Date(),
      userId: 6,
      time: 0
    }, {
      name: 'test_room_2', // id = 2
      createdAt: new Date('01/01/2018'),
      startedAt: new Date('01/01/2018'),
      endedAt: new Date('02/02/2018'),
      time: 8,
      userId: 6
    }, {
      name: 'test_room_3', // id = 3
      createdAt: new Date('01/01/2018'),
      time: 8,
      userId: 1
    }, {
      name: 'test_room_4', // id = 4
      createdAt: new Date('01/01/2018'),
      startedAt: new Date('01/01/2018'),
      openedAt: new Date('01/01/2018'),
      time: 8,
      userId: 6
    }, {
      name: 'test_room_5', // id = 5
      createdAt: new Date('01/01/2018'),
      openedAt: new Date('01/01/2018'),
      time: 8,
      userId: 6
    }, {
      name: 'test_room_6', // id = 6
      createdAt: new Date('01/01/2018'),
      openedAt: new Date('01/01/2018'),
      time: 8,
      userId: 6
    }, {
      name: 'test_room_7', // id = 7
      createdAt: new Date('01/01/2018'),
      openedAt: new Date('01/01/2018'),
      time: 8,
      userId: 6
    }, {
      name: 'test_room_8', // id = 8
      createdAt: new Date('01/01/2018'),
      time: 8,
      userId: 6
    }, {
      name: 'test_room_9', // id = 9
      createdAt: new Date('01/01/2018'),
      startedAt: new Date('01/01/2018'),
      endedAt: new Date('02/02/2018'),
      time: 8,
      userId: 6
    }, {
      name: 'test_room_10', // id = 10
      createdAt: new Date('01/01/2018'),
      time: 8,
      userId: 6
    }, {
      name: 'test_room_10', // id = 11
      createdAt: new Date('01/01/2018'),
      startedAt: new Date('01/01/2018'),
      openedAt: new Date('01/01/2018'),
      endedAt: new Date('01/01/2018'),
      time: 8,
      userId: 6
    }])
  }
}