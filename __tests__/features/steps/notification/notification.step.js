import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { assert } from 'chai'

import { validProps } from '../stepsHelper'
import app from '../../../../src/server'

const request = supertest(app)
let token = null
let notifications = null
let resultRequest = null

/**
 *  Obter minhas notificações
 * */
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

/**
 *  Remover notificação
 * */
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
      resultRequest = result.body
    })
})

Then('Então eu devo receber a mensagem {string} depois de remover a notificação', (json) => {
  validProps(json, resultRequest.message)
})

/**
 *  Marcar notificações como lida
 * */
Given('Dado que eu queira marcar minhas notificações como lidas', () => {
  return request
    .post('/api/token')
    .send({ email: 'test_room@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu marcar minhas notificações como lidas', () => {
  return request
    .put('/api/notification-read')
    .set({ token: token })
    .then((result) => {
      resultRequest = result.body
    })
})

Then('Então eu devo obter um retorno de sucesso de notificações lidas {string}', (json) => {
  validProps(json, resultRequest.message)
})

/**
 *  Remover todas as notificações
 * */
Given('Dado remover todas minhas notificações', () => {
  return request
    .post('/api/token')
    .send({ email: 'test_room@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu remover todas minhas notificações', () => {
  return request
    .delete('/api/notification')
    .set({ token: token })
    .then((result) => {
      resultRequest = result.body
    })
})

Then('Então eu devo obter um retorno de sucesso de notificações removidas {string}', (json) => {
  validProps(json, resultRequest.message)
})