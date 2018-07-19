module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('RoomAnswer', [{
      questionId: 16,
      answerId: 32,
      userId: 6,
      score: 5,
      roomId: 1
    }, {
      questionId: 17,
      answerId: 36,
      userId: 6,
      score: 30,
      roomId: 1
    }])
  }
}