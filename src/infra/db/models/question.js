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
  area: {
    type: Sequelize.STRING,
    allowNull: false
  },
  difficulty: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sync: {
    type: Sequelize.CHAR(1),
    allowNull: false,
    defaultValue: ''
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: new Date('01/01/1970')
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: new Date('01/01/1970')
  },
  sharedQuestionId: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}

export const modelOptions = {
  freezeTableName: modelName,
  undercored: false,
  updatedAt: false,
  createdAt: false
}