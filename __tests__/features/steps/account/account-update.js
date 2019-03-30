import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'

import { validProps } from '../stepsHelper'
import app from '../../../../src/server'

const request = supertest(app)
let account = null
let token = null

Given('Dado que eu queira atualizar meus dados', () => {
  account = {
    name: 'questionmock1',
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

Then('Então eu devo obter a mensagem {string} ao tentar atualizar', (json) => {
  return request
    .put('/api/account')
    .set({ token: token })
    .send(account)
    .then((result) => validProps(json, result.body.message))
})