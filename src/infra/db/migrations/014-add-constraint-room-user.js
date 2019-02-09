module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('RoomUser', ['userId', 'roomId'], {
    type: 'unique',
    name: 'pk_room_user'
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('RoomUser', 'pk_room_user')
}