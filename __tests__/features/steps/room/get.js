import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { expect, assert } from 'chai'

import app from '../../../../src/server'

const request = supertest(app)
let rooms = []
let token = ''
let room = null

/**
 * Obter salas abertas
 */
Given('Dado eu que queira obter as salas abertas', () => {
  return request
    .post('/api/token')
    .send({ email: 'test_room@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu buscar as salas abertas', () => {
  return request
    .get('/api/room-opened')
    .set({ token: token })
    .then((result) => {
      rooms = result.body
    })
})

Then('Então eu devo obter uma lista de salas abertas', () => {
  let ok = true
  for (let i = 0; i < rooms.length; i++)
    if (!rooms[i].openedAt || rooms[i].startedAt || rooms[i].endedAt)
      ok = false
  assert.isOk(ok, 'Uma das salas retornadas não está disponível.')
  assert.isOk(rooms.length > 0, 'Deve retornar pelo menos uma sala disponível.')
})

/**
 * Obter salas que me pertencem
 */
Given('Dado que eu queira obter as salas que me pertencem', () => {
  return request
    .post('/api/token')
    .send({ email: 'test_room@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu buscar as salas que me pertencem', () => {
  return request
    .get('/api/room-my')
    .set({ token: token })
    .then((result) => {
      rooms = result.body
    })
})

Then('Então eu devo obter uma lista de salas que me pertencem', () => {
  let ok = true
  for (let i = 0; i < rooms.length; i++)
    if (rooms[i].userId !== 6)
      ok = false
  assert.isOk(ok, `Uma das salas não pertencem ao usuário. ${JSON.stringify(rooms)}`)
  assert.isTrue(rooms.length > 0, 'Deve retornar pelo menos uma sala que pertence ao usuário.')
})

/**
 * Obter salas que participei
 */
Given('Dado eu que queira obter as salas que participei', () => {
  return request
    .post('/api/token')
    .send({ email: 'test_room@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu buscar as salas que participei', () => {
  return request
    .get('/api/room-associated')
    .set({ token: token })
    .then((result) => {
      rooms = result.body
    })
})

Then('Então eu devo obter uma lista de salas que participei', () => {
  assert.isOk(rooms.length > 0, `Deve retornar pelo menos uma sala que o usuário participou. ${JSON.stringify(rooms)}`)
})

/**
 * Obter minha sala
 */
Given('Dado eu que queira obter minha sala', () => {
  return request
    .post('/api/token')
    .send({ email: 'test_room@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu obter uma sala com id {int}', (id) => {
  return request
    .get(`/api/room/${id}`)
    .set({ token: token })
    .then((result) => {
      room = result.body
    })
})

Then('Então a sala deve ter status {string}', (status) => {
  expect(room.status).to.eql(status)
})