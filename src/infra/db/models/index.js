import Sequelize from 'sequelize'

import config from '../../config'

const DbConfig = config[config.NODE_ENV]

const sequelize = process.env.NODE_ENV === 'development'
  ? new Sequelize('quiz-room', null, null, DbConfig)
  : new Sequelize(DbConfig.DATABASE_URI, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: true
    }
  })

let db = {}
db.User = sequelize.define('User', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.STRING
}, {
    freezeTableName: 'User',
    undercored: false,
    updatedAt: false,
    createdAt: false
  })

db.Question = sequelize.define('Question', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  description: Sequelize.STRING,
  points: Sequelize.INTEGER
}, {
    freezeTableName: 'Question',
    undercored: false,
    updatedAt: false,
    createdAt: false
  })

db.Answer = sequelize.define('Answer', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  description: Sequelize.STRING,
  correct: Sequelize.BOOLEAN
}, {
    freezeTableName: 'Answer',
    undercored: false,
    updatedAt: false,
    createdAt: false
  })

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