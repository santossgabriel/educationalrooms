module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Log', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      description: Sequelize.STRING,
      date: Sequelize.DATE
    }, {
        freezeTableName: 'Log',
        undercored: false,
        updatedAt: false,
        createdAt: false
      })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('Log')
  }
}