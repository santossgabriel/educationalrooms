module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'User',
      'updateAt', {
        type: Sequelize.DATE
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'User',
      'updateAt'
    )
  }
}