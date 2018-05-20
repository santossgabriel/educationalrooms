import Sequelize from 'sequelize'

import config from '../config'

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

export const User = sequelize.define('User', {
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
    freezeTableName: 'user'
  })

export const Question = sequelize.define('question', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  description: Sequelize.STRING,
  points: Sequelize.INTEGER
}, {
    freezeTableName: 'question'
  })

export const Answer = sequelize.define('answer', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  description: Sequelize.STRING,
  correct: Sequelize.BOOLEAN
}, {
    freezeTableName: 'answer'
  })

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