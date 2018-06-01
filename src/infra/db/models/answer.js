import Sequelize from 'sequelize'

import * as Question from './question'

export const modelName = 'Answer'

export const modelAttributes = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  description: Sequelize.STRING,
  correct: Sequelize.BOOLEAN,
  questionId: {
    type: Sequelize.INTEGER,
    references: { model: Question.modelName, key: 'id' }
  },
  classification: Sequelize.CHAR(1)
}

export const modelOptions = {
  freezeTableName: modelName,
  undercored: false,
  updatedAt: false,
  createdAt: false
}