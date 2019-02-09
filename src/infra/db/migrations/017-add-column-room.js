module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Room', 'openedAt', Sequelize.DATE),
  down: (queryInterface, Sequelize) => null
}