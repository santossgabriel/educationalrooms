module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('User', 'createdAt', Sequelize.DATE)
    queryInterface.addColumn('User', 'updatedAt', Sequelize.DATE)
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('User', 'createdAt')
    queryInterface.removeColumn('User', 'updatedAt')
  }
}