import Sequelize from 'sequelize'
import * as User from './user'
import * as Log from './log'
import * as Question from './question'
import * as Answer from './answer'

import config from '../../config'

const env = config.NODE_ENV
const DbConfig = config[env]

const sequelize = env !== 'test'
  ? new Sequelize(DbConfig.DATABASE_URI, {
    dialect: config[env].dialect,
    logging: config[env].logging,
    dialectOptions: config[env].dialectOptions,
    operatorsAliases: false
  })
  : new Sequelize('quizroom', null, null, DbConfig)

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