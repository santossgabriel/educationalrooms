module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('Question', 'category'),
  down: (queryInterface, Sequelize) => null
}