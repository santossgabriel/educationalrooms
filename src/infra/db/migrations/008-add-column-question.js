module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Question',
      'sync',
      Sequelize.CHAR(1)
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Question',
      'sync'
    );
  }
}