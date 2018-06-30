import Sequelize from 'sequelize'

import * as Question from './question'

export const modelName = 'Answer'

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
  correct: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: Question.modelName, key: 'id' }
  },
  classification: {
    type: Sequelize.CHAR(1),
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