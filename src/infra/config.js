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
  TEST: {
    DATABASE_URI: process.env.DATABASE_URI,
    dialectOptions: { ssl: true }
  },
  PROD: {
    DATABASE_URI: process.env.DATABASE_URI,
    dialectOptions: { ssl: true }
  }
}