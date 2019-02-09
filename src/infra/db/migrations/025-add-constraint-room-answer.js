module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('RoomAnswer',
    ['roomId', 'questionId', 'userId'], {
      type: 'unique',
      name: 'room_answer_unique'
    }),
  down: (queryInterface, Sequelize) => null
}