module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('RoomQuestion', {
    type: 'unique',
    name: 'pk_room_question',
    fields: ['roomId', 'questionId'],
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('RoomQuestion', 'pk_room_question')
}