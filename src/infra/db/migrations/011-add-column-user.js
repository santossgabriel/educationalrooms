module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('User', 'createdAt', Sequelize.DATE),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('User', 'createdAt')
}