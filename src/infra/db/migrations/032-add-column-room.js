module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Room', 'startedAt', Sequelize.DATE),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Room', 'startedAt')
}