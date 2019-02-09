module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'User',
    'mobile',
    Sequelize.BOOLEAN
  ),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn(
      'User',
      'mobile'
    )
}