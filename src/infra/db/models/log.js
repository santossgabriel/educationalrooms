import Sequelize from 'sequelize'

export const modelName = 'Log'

export const modelAttributes = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: ''
  }
}

export const modelOptions = {
  freezeTableName: modelName,
  undercored: false,
  updatedAt: false,
  createdAt: false
}