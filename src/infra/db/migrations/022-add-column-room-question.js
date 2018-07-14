module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('RoomQuestion', 'points', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 50
    })
  },

  down: function (queryInterface, Sequelize) { }
}