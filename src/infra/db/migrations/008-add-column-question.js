module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Question',
    'sync', {
      type: Sequelize.CHAR(1),
      allowNull: false,
      defaultValue: ''
    }
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Question', 'sync')
}