module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'User',
      'mobile',
      Sequelize.BOOLEAN
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'User',
      'mobile'
    );
  }
}