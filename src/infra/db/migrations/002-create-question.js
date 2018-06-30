module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Question', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      description: Sequelize.STRING,
      points: Sequelize.INTEGER,
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'User', key: 'id' }
      },
      shared: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
        freezeTableName: 'User',
        undercored: false,
        updatedAt: false,
        createdAt: false
      })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('Question')
  }
}