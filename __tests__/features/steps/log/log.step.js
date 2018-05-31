import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { expect } from 'chai'

import app from '../../../../src/server'

const request = supertest(app)
let token = null
let body = null

Given('Dado que eu esteja logado com usuário {string} e senha {string}', (user, password) => {
  return request
    .post('/api/token')
    .send({ email: user, password: password })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu buscar os logs', () => {
  return request
    .get('/api/log')
    .set({ token: token })
    .then((result) => {
      body = result.body
    })
})

Then('Então eu devo obter dos logs a mansagem {string}', (message) => {
  expect(body.message || 'Logs retornados com sucesso.').to.eql(message)
})