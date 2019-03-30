import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'

import app from '../../../../src/server'
import { validProps } from '../stepsHelper'

const request = supertest(app)
let msgResponse = {}

Given('Dado que eu esteja cadastrado', () => { msgResponse = {} })
When('Quando eu enviar as credenciais {string}', (credentials) => {
  return request
    .post('/api/token')
    .send(JSON.parse(credentials))
    .then((result) => {
      msgResponse = result.body.message
    })
})
Then('Para obter o token eu devo obter a mensagem {string}', (json) => {
  validProps(json, msgResponse)
})

Given('Dado que eu queira acessar um endpoint permissionado', () => { msgResponse = {} })
When('Quando eu não enviar o token', () => {
  return request
    .get('/api/question')
    .then((result) => {
      msgResponse = result.body.message
    })
})
Then('Então eu devo obter o retorno {string}', (json) => {
  validProps(json, msgResponse)
})