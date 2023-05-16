module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('RoomUser', {
    type: 'unique',
    name: 'pk_room_user',
    fields: ['userId', 'roomId']
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('RoomUser', 'pk_room_user')
}