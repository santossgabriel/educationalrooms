import Sequelize from 'sequelize'

import config from '../../config'

const sequelize = new Sequelize('quiz-room', null, null, config[config.NODE_ENV])

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



// export default sequelize




// import fs from 'fs'
// import path from 'path'
// import Sequelize from 'sequelize'
// let basename = path.basename(__filename)
// let env = process.env.NODE_ENV || 'development'
// let config = require(__dirname + '/../config/config.json')[env]
// let db = {}

// let sequelize = null

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config)
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config)
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
//   })
//   .forEach(file => {
//     const model = sequelize['import'](path.join(__dirname, file))
//     db[model.name] = model
//   })

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db)
//   }
// })

// db.sequelize = sequelize
// db.Sequelize = Sequelize

// module.exports = db