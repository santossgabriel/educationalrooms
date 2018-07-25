module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Question',
      'category', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Iniciante'
      }
    );
  },

  down: function (queryInterface, Sequelize) { }
}