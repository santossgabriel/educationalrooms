import Sequelize from 'sequelize'

export const modelName = 'OnlineRoom'

export const modelAttributes = {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'Room', key: 'id' }
  },
  currentOrder: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  changedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  }
}

export const modelOptions = {
  freezeTableName: modelName,
  undercored: false,
  updatedAt: false,
  createdAt: false
}