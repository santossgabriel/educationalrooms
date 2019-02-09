module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('RoomAnswer', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'User', key: 'id' }
    },
    answerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Answer', key: 'id' }
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, {
      tableName: 'RoomAnswer',
      uniqueKeys: {
        actions_unique: {
          fields: ['roomId', 'questionId', 'userId']
        }
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('RoomAnswer')
}