import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { expect } from 'chai'

import app from '../../../../src/server'

const request = supertest(app)
let room = null
let token = ''
let msg = ''

Given('Dado eu que queira criar uma sala', () => {
  room = { name: 'sala mock test' }

  return request
    .post('/api/token')
    .send({ email: 'test_room@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu criar a sala {string} com nome {string}', (caso, name) => {
  room.name = name
})

Then('Então eu devo obter a mensagem {string} depois de tentar criar a sala', (message) => {

  return request
    .post('/api/room')
    .set({ token: token })
    .send(room)
    .then((result) => {
      expect(result.body.message).to.eql(message)
    })
})

Given('Dado eu que queira entrar em uma sala', () => {
  return request
    .post('/api/token')
    .send({ email: 'questionmock1@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu entrar em uma sala {string} usando id {int}', (caso, id) => {

  return request
    .put(`/api/room-enter/${id}`)
    .set({ token: token })
    .then((result) => {
      msg = result.body.message
    })
})

Then('Então eu devo obter a mensagem {string} depois de tentar entrar na sala', (message) => {
  expect(msg).to.eql(message)
})

Given('Dado eu que queira adicionar questões à uma sala', () => {
  room = {
    name: 'sala de mock test',
    questions: [
      { id: 16, order: 1 },
      { id: 17, order: 2 },
      { id: 18, order: 3 }
    ],
    roomId: 1
  }

  return request
    .post('/api/token')
    .send({ email: 'test_room@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando adicionar as questões {string} atribuindo {string}', (caso, p) => {
  if (p) {
    const props = JSON.parse(p)
    for (let key in props)
      room[key] = props[key]
  }
  else
    room = null
})

Then('Então eu devo obter a mensagem {string} depois de tentar adicionar as questões', (message) => {
  return request
    .put('/api/room')
    .set({ token: token })
    .send(room)
    .then((result) => {
      expect(result.body.message).to.eql(message)
    })
})