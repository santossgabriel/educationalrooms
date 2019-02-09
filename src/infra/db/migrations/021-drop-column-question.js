module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('Question', 'points'),
  down: (queryInterface, Sequelize) => queryInterface.addColumn('Question', 'points', {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  })
}