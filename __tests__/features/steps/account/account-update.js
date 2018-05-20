import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { expect } from 'chai'

import app from '../../../../src/server'

const request = supertest(app)
let account = null
let token = null

Given('Dado que eu queira atualizar meus dados', () => {
  account = {
    email: 'questionmock1@mail.com',
    password: '123qwe'
  }

  return request
    .post('/api/token')
    .send({ email: 'questionmock1@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})


When('Quando eu atualizar meus dados {string} atribuindo {string}', (caso, p) => {
  if (p === 'null')
    account = null
  else {
    const props = JSON.parse(p)
    for (let key in props)
      account[key] = props[key]
  }
})

Then('Então eu devo obter a mensagem {string} ao tentar atualizar', (message) => {
  return request
    .put('/api/account')
    .set({ token: token })
    .send(account)
    .then((result) => {
      expect(result.body.message).to.eql(message)
    })
})