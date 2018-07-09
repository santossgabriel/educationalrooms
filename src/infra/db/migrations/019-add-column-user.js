module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('User', 'google', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
  },

  down: function (queryInterface, Sequelize) { }
}