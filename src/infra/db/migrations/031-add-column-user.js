module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('User', 'updatedAt', Sequelize.DATE),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('User', 'updatedAt')
}