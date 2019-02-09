module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('RoomQuestion', 'points', {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 50
  }),
  down: (queryInterface, Sequelize) => null
}