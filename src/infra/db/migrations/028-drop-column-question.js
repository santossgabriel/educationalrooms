module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('Question', 'category'),
  down: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Question',
    'category', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Iniciante'
    }
  )
}