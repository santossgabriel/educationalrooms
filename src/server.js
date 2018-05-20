import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import jwt from 'jsonwebtoken'

import router from './routes/index'
import auth from './auth/auth'

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

app.use(auth)

router(app)

module.exports = http.createServer(app)