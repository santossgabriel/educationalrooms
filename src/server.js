import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import jwt from 'jsonwebtoken'

import router from './routes/index'
import socket, { runJob } from './socket/index'
import auth from './auth/auth'

const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

// if (process.env.NODE_ENV !== 'test')
//   app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(express.static('public'))

app.use(auth)

router(app)

const server = http.createServer(app)
socket(server)

runJob()

module.exports = server