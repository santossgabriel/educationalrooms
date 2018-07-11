import Sequelize from 'sequelize'

export const modelName = 'Notification'

export const modelAttributes = {
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
  read: Sequelize.BOOLEAN
}

export const modelOptions = {
  freezeTableName: modelName,
  undercored: false,
  updatedAt: false,
  createdAt: false
}