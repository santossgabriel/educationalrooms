module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Log', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: ''
      }
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