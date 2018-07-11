import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { assert } from 'chai'

import app from '../../../../src/server'

const request = supertest(app)
let token = null
let notifications = null

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