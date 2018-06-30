module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'User',
      'createAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date('01/01/1970')
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'User',
      'createAt'
    );
  }
}