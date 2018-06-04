module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Question',
      'category',
     Sequelize.STRING
    );
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Question',
      'category'
    );
  }
}