import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { expect } from 'chai'

import app from '../../../../src/server'

const request = supertest(app)
let msg = ''

Given('Dado que eu esteja cadastrado', () => { msg = '' })
When('Quando eu enviar as credenciais {string}', (credentials) => {
  return request
    .post('/token')
    .send(JSON.parse(credentials))
    .then((result) => {
      msg = result.body.message
    })
})
Then('Para obter o token eu devo obter a mensagem {string}', (message) => {
  expect(msg).to.eql(message)
})

Given('Dado que eu queira acessar um endpoint permissionado', () => { msg = 'test' })
When('Quando eu não enviar o token', () => {
  return request
    .get('/api/question')
    .then((result) => {
      msg = result.body.message
    })
})
Then('Então eu devo obter a mensagem {string}', (message) => {
  expect(msg).to.eql(message)
})