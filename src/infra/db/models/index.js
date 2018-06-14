import Sequelize from 'sequelize'
import * as User from './user'
import * as Log from './log'
import * as Question from './question'
import * as Answer from './answer'

import config from '../../config'

const DbConfig = config[config.NODE_ENV]

const sequelize = process.env.NODE_ENV === 'prod'
  ? new Sequelize(DbConfig.DATABASE_URI, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: true
    }
  })
  : new Sequelize('postgres', 'postgres', '123', DbConfig)

let db = {}

db.Log = sequelize.define(Log.modelName, Log.modelAttributes, Log.modelOptions)

db.User = sequelize.define(User.modelName, User.modelAttributes, User.modelOptions)

db.Question = sequelize.define(Question.modelName, Question.modelAttributes, Question.modelOptions)

db.Answer = sequelize.define(Answer.modelName, Answer.modelAttributes, Answer.modelOptions)

db.Question.hasMany(db.Answer, {
  foreignKey: {
    name: 'questionId',
    allowNull: false
  }
})

db.User.hasMany(db.Question, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db