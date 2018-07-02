module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('RoomUser', ['userId', 'roomId'], {
      type: 'unique',
      name: 'pk_room_user'
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('RoomUser')
  }
}