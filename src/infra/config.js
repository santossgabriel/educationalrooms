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
    DATABASE_URI: process.env.DATABASE_URI,
    dialectOptions: { ssl: true },
    dialect: process.env.DIALECT
  },
  prod: {
    DATABASE_URI: process.env.DATABASE_URI,
    url: process.env.DATABASE_URI,
    dialectOptions: { ssl: true },
    dialect: 'postgres'
  }
}