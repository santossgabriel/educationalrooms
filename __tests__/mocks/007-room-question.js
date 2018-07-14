module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('RoomQuestion', [{
      roomId: 1,
      questionId: 16,
      points: 80,
      order: 2
    }, {
      roomId: 1,
      questionId: 17,
      order: 1,
      points: 60,
    }])
  }
}