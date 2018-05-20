import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { expect } from 'chai'

import app from '../../../../src/server'

const request = supertest(app)
let msg = ''
let token = null

Given('Dado que eu queira obter os dados da minha conta', () => {
  return request
    .post('/api/token')
    .send({ email: 'questionmock1@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})
When('Quando eu buscar os dados', () => {
  return request
    .get('/api/account')
    .set({ token: token })
    .then((result) => {
      msg = result.body.email
    })
})
Then('Então eu devo obter a propriedade Email igual a {string}', (email) => {
  expect(msg).to.eql(email)
})