import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { expect, assert } from 'chai'

import app from '../../../../src/server'

const request = supertest(app)
let token = null
let notifications = null
let resultRemove = null

Given('Dado que eu queira obter minhas notificações', () => {
  return request
    .post('/api/token')
    .send({ email: 'test_room@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu buscar minhas notificações', () => {
  return request
    .get('/api/notification')
    .set({ token: token })
    .then((result) => {
      notifications = result.body
    })
})

Then('Então eu devo obter uma lista de notificações', () => {
  assert.isArray(notifications, 'O retorno deve ser um array')
  assert.isTrue(notifications.length > 0, 'Deve ser retornado notificações')
})

Given('Dado que eu queira remover a notificação', () => {
  return request
    .post('/api/token')
    .send({ email: 'test_room@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu remover uma notificação de id {int}', (id) => {
  return request
    .delete(`/api/notification/${id}`)
    .set({ token: token })
    .then((result) => {
      resultRemove = result.body
    })
})

Then('Então eu devo receber a mensagem {string} depois de remover a notificação', (message) => {
  expect(resultRemove.message, message)
})