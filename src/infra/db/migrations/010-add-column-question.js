module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Question', 'createdAt', Sequelize.DATE)
    queryInterface.addColumn('Question', 'updatedAt', Sequelize.DATE)
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Question', 'createdAt')
    queryInterface.removeColumn('Question', 'updatedAt')
  }
}