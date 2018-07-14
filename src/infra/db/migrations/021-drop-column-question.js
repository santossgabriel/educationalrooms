module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Question', 'points')
  },

  down: function (queryInterface, Sequelize) { }
}