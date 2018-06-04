module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'User',
      'updateAt',
     Sequelize.DATE
    );
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'User',
      'updateAt'
    );
  }
}