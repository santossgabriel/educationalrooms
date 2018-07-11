module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Notification', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'User', key: 'id' },
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date('01/01/1970')
      },
      read: Sequelize.BOOLEAN,
      type: Sequelize.STRING,
      origin: Sequelize.STRING
    }, {
        freezeTableName: 'Notification',
        undercored: false,
        updatedAt: false,
        createdAt: false
      })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('Notification')
  }
}