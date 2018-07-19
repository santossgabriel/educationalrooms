module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('RoomAnswer', ['roomId', 'questionId', 'userId'], {
      type: 'unique',
      name: 'room_answer_unique'
    })
  },
  down: function (queryInterface, Sequelize) { }
}