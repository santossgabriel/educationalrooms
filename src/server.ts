import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import router from './routes/index'
import socket, { startJob } from './socket/index'
import auth from './auth/auth'

const app = express()

if (process.env.NODE_ENV !== 'test')
  app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(express.static('public'))

app.use(auth)


router(app)

const server = http.createServer(app)
socket(server)

startJob()

export default server