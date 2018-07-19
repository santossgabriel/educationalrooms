import Sequelize from 'sequelize'

export const modelName = 'RoomAnswer'

export const modelAttributes = {
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
  answerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'Answer', key: 'id' }
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'User', key: 'id' }
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}

export const modelOptions = {
  freezeTableName: modelName,
  undercored: false,
  updatedAt: false,
  createdAt: false,
  indexes: [
    {
      name: 'room_answer_pk',
      type: 'unique',
      fields: ['id', 'questionId', 'userId']
    }
  ]
}