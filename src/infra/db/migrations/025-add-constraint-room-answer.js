module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('RoomAnswer', ['id', 'questionId', 'userId'], {
      type: 'primary key',
      name: 'room_answer_pk'
    })
  },
  down: function (queryInterface, Sequelize) { }
}