module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Room', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      secondsStep: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
      endedAt: Sequelize.DATE
    }, {
        freezeTableName: 'Room',
        undercored: false,
        updatedAt: false,
        createdAt: false
      })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('Room')
  }
}