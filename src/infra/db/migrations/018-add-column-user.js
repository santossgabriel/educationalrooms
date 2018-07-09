module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('User', 'picture', Sequelize.STRING(1000))
  },

  down: function (queryInterface, Sequelize) { }
}