import Sequelize from 'sequelize'

export const modelName = 'RoomQuestion'

export const modelAttributes = {
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
  order:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}

export const modelOptions = {
  freezeTableName: modelName,
  undercored: false,
  updatedAt: false,
  createdAt: false
}