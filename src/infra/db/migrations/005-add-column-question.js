module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Question',
    'area', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Conhecimentos gerais'
    }
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Question', 'area')
}