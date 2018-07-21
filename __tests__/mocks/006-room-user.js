module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('RoomUser', [{
      userId: 1,
      roomId: 1,
      accepted: true,
      score: 8,
      enteredIn: new Date()
    }, {
      userId: 6,
      roomId: 1,
      accepted: true,
      score: 8,
      enteredIn: new Date()
    }, {
      userId: 1,
      roomId: 6,
      accepted: true,
      score: 8,
      enteredIn: new Date()
    }, {
      userId: 6,
      roomId: 11,
      accepted: true,
      score: 8,
      enteredIn: new Date()
    }, {
      userId: 6,
      roomId: 9,
      accepted: true,
      score: 8,
      enteredIn: new Date()
    }, {
      userId: 6,
      roomId: 2,
      accepted: true,
      score: 8,
      enteredIn: new Date()
    }])
  }
}