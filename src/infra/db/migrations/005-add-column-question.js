module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Question',
      'area',{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Conhecimentos gerais'
      }
    );
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Question',
      'area'
    );
  }
}