try {
  const dotenv = require('dotenv')
  dotenv.config()
} catch (ex) {
  if (!process.env.NODE_ENV)
    console.log(ex)
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  SECRET: process.env.SECRET,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  DROPBOX_TOKEN: process.env.DROPBOX_TOKEN,
  dev: {
    DATABASE_URI: process.env.DATABASE_URL,
    url: process.env.DATABASE_URL,
    dialectOptions: { ssl: true },
    dialect: 'postgres',
    logging: true
  },
  test: {
    dialect: 'sqlite',
    storage: './quiz-room.db',
    logging: false
  },
  prod: {
    DATABASE_URI: process.env.DATABASE_URL,
    url: process.env.DATABASE_URL,
    dialectOptions: { ssl: true },
    dialect: 'postgres',
    logging: true
  }
}