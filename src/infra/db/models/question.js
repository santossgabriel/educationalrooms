import Sequelize from 'sequelize'

export const modelName = 'Question'

export const modelAttributes = {
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
  shared: Sequelize.BOOLEAN
}

export const modelOptions = {
  freezeTableName: modelName,
  undercored: false,
  updatedAt: false,
  createdAt: false
}