module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Question', 'category')
  },

  down: function (queryInterface, Sequelize) { }
}