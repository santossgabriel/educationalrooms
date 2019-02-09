module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('User', 'picture', Sequelize.STRING(1000)),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('User', 'picture')
}