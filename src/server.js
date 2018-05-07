import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'

import router from './routes/index'

const app = express()

app.use(bodyParser.json())

router(app)

module.exports = http.createServer(app)