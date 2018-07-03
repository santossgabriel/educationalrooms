module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RoomQuestion', {
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
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Question', key: 'id' }
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
        tableName: 'RoomQuestion',
        uniqueKeys: {
          actions_unique: {
            fields: ['questionId', 'roomId']
          }
        }
      })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('RoomQuestion')
  }
}