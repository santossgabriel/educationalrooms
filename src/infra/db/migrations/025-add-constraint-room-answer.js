module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('RoomAnswer',
    ['roomId', 'questionId', 'userId'], {
      type: 'unique',
      name: 'room_answer_unique'
    }),
  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('RoomAnswer', 'room_answer_unique')
}