module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'User',
      'createAt',
     Sequelize.DATE
    );
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'User',
      'createAt'
    );
  }
}