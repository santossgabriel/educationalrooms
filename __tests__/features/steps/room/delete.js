import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { expect } from 'chai'

import app from '../../../../src/server'

const request = supertest(app)
let token = ''
let msg = ''

Given('Dado que eu queira remover uma sala', () => {
  return request
    .post('/api/token')
    .send({ email: 'test_room@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu enviar o id de uma sala {string} {int}', (caso, id) => {
  return request
    .delete(`/api/room/${id}`)
    .set({ token: token })
    .then((result) => { msg = result.body.message })
})

Then('Então eu devo obter a mensagem {string} depois de tentar remover a sala', (message) => {
  expect(msg).to.eql(message)
})