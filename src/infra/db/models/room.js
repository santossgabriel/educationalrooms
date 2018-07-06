import Sequelize from 'sequelize'

export const modelName = 'Room'

export const modelAttributes = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  time: {
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
  endedAt: Sequelize.DATE,
  openedAt: Sequelize.DATE,
  startedAt: Sequelize.DATE
}

export const modelOptions = {
  freezeTableName: modelName,
  undercored: false,
  updatedAt: false,
  createdAt: false
}