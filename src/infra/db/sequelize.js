import Sequelize from 'sequelize'
import * as UserS from './models/user'
import * as AnswerS from './models/answer'
import * as QuestionS from './models/question'

import config from '../config'

const DbConfig = config[config.NODE_ENV]

const sequelize = process.env.NODE_ENV === 'prod'
  ? new Sequelize(DbConfig.DATABASE_URI, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: true
    }
  })
  : new Sequelize('quiz-room', null, null, DbConfig)



export const User = sequelize.define('User', UserS.modelAttributes, UserS.modelOptions)

export const Question = sequelize.define('question', QuestionS.modelAttributes, QuestionS.modelOptions)


export const Answer = sequelize.define('answer', AnswerS.modelAttributes, AnswerS.modelOptions)

Question.hasMany(Answer, {
  foreignKey: {
    name: 'questionId',
    allowNull: false
  }
})

User.hasMany(Question, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
})

export default sequelize