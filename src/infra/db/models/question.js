import Sequelize from 'sequelize'

export const modelName = 'Question'

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
  points: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'User', key: 'id' }
  },
  shared: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  sync: {
    type: Sequelize.CHAR(1),
    allowNull: false,
    defaultValue: ''
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}

export const modelOptions = {
  freezeTableName: modelName,
  undercored: false,
  updatedAt: false,
  createdAt: false
}