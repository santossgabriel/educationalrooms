module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Question',
      'sharedQuestionId', {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    );
  },

  down: function (queryInterface, Sequelize) { }
}