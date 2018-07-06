module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Room', 'openedAt', Sequelize.DATE)
    queryInterface.addColumn('Room', 'startedAt', Sequelize.DATE)
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('User', 'openedAt')
    queryInterface.removeColumn('User', 'startedAt')
  }
}