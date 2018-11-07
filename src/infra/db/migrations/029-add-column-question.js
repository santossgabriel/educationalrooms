module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Question',
      'difficulty', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    );
  },

  down: function (queryInterface, Sequelize) { }
}