import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { expect } from 'chai'

import app from '../../../src/server'

const request = supertest(app)
let msg = ''
let account = null

let token = null

/**
 * Obter o token
 */
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

/**
 * Não enviar o token
 */
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

/**
 * Criar cadastro
 */
Given('Dado que eu queira me cadastrar', () => {
  account = {
    email: 'teste2@mail.com',
    password: '123qwe'
  }
})

When('Quando eu enviar {string} atribuindo {string}', (caso, p) => {
  if (p === 'null')
    account = null
  else {
    const props = JSON.parse(p)
    for (let key in props)
      account[key] = props[key]
  }
})

Then('Então eu devo obter a mensagem {string} ao tentar me cadastrar', (message) => {
  return request
    .post('/api/account')
    .send(account)
    .then((result) => {
      expect(result.body.message).to.eql(message)
    })
})

/**
 * Atualizar cadastro
 */
Given('Dado que eu queira atualizar meus dados', () => {
  account = {
    email: 'questionmock1@mail.com',
    password: '123qwe'
  }

  return request
    .post('/token')
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