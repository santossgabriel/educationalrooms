import Sequelize from 'sequelize'

import config from '../config'

const sequelize = new Sequelize('quiz-room', null, null, config[config.NODE_ENV])

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