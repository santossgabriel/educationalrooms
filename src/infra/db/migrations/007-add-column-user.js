module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'User',
    'updateAt', {
      type: Sequelize.DATE
    }
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('User', 'updateAt')
}