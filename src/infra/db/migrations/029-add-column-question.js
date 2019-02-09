module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Question',
    'difficulty', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  ),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Question', 'difficulty')
}