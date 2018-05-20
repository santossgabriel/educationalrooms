try {
  const dotenv = require('dotenv')
  dotenv.load()
} catch (ex) { }

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  SECRET: process.env.SECRET,
  development: {
    host: process.env.host,
    dialect: process.env.DIALECT,
    storage: process.env.STORAGE,
    operatorsAliases: false,
    logging: false
  },
  test: {
    dialect: 'sqlite',
    storage: './quiz-room.db',
    operatorsAliases: false,
    logging: false
  },
  prod: {
    DATABASE_URI: process.env.DATABASE_URL,
    url: process.env.DATABASE_URL,
    dialectOptions: { ssl: true },
    dialect: 'postgres'
  }
}