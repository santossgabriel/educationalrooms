module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RoomUser', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      roomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Room', key: 'id' }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'User', key: 'id' }
      },
      enteredIn: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date('01/01/1970')
      },
      accepted: Sequelize.BOOLEAN,
      score: Sequelize.INTEGER
    },
      {
        tableName: 'RoomUser',
        uniqueKeys: {
          actions_unique: {
            fields: ['userId', 'roomId']
          }
        }
      })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('RoomUser')
  }
}