module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Question',
      'sync', {
        type: Sequelize.CHAR(1),
        allowNull: false,
        defaultValue: ''
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Question',
      'sync'
    )
  }
}