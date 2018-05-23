import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { expect } from 'chai'

import app from '../../../../src/server'

const request = supertest(app)
let msg = null
let token = ''

Given('Dado que eu queira remover uma questão', () => {
  return request
    .post('/api/token')
    .send({ email: 'questionmock3@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu enviar o id de uma questão {string} {int}', (caso, id) => {
  return request
    .delete(`/api/question/${id}`)
    .set({ token: token })
    .then((result) => { msg = result.body.message })
})

Then('Então eu devo obter a mensagem {string} depois de tentar remover a questão', (message) => {
  expect(msg).to.eql(message)
})