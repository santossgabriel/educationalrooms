module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('RoomAnswer', {
    type: 'unique',
    name: 'room_answer_unique',
    fields: ['roomId', 'questionId', 'userId']
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('RoomAnswer', 'room_answer_unique')
}