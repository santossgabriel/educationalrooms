module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('Question', 'points'),
  down: (queryInterface, Sequelize) => null
}