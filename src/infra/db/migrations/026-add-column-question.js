module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Question',
    'category', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Iniciante'
    }
  ),
  down: (queryInterface, Sequelize) => null
}