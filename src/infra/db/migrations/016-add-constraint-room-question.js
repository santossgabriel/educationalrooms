module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('RoomQuestion', ['roomId', 'questionId'], {
      type: 'unique',
      name: 'pk_room_question'
    })
  },
  down: function (queryInterface, Sequelize) { }
}