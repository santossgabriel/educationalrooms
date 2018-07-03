module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('RoomQuestion', [{
      roomId: 1,
      questionId: 16,
      order: 2
    }, {
      roomId: 1,
      questionId: 17,
      order: 1
    }])
  }
}