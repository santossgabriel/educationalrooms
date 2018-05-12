try {
  const dotenv = require('dotenv')
  dotenv.load()
} catch (ex) { }

export default {
  NODE_ENV: process.env.NODE_ENV,
  SECRET: process.env.SECRET,
  DEV: {
    host: process.env.host,
    dialect: process.env.DIALECT,
    storage: process.env.STORAGE,
    operatorsAliases: false,
    logging: false
  },
  TEST: {
    DATABASE_URI: process.env.DATABASE_URI
  },
  PROD: {
    DATABASE_URI: process.env.DATABASE_URI
  }
}