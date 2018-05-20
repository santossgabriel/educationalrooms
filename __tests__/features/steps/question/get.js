import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { assert, expect } from 'chai'

import app from '../../../../src/server'

const request = supertest(app)
let questions = []
let question = null
let token = ''

Given('Dado que eu esteja logado e queira obter minhas questões', () => {
  return request
    .post('/api/token')
    .send({ email: 'questionmock1@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu buscar as questões', () => {
  return request
    .get('/api/question')
    .set({ token: token })
    .then((result) => {
      questions = result.body
    })
})

Then('Então eu devo obter somente as minhas questões', () => {
  let ok = true
  for (let i = 0; i < questions.length; i++)
    if (questions[i].userId != 1)
      ok = false
  assert.isOk(ok, 'Uma das questões não pertence ao usuário logado.')
})

Given('Dado que eu queira obter uma questão pelo id', () => {
  return request
    .post('/api/token')
    .send({ email: 'questionmock1@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu buscar a questão', () => {
  return request
    .get('/api/question/1')
    .set({ token: token })
    .then((result) => {
      question = result.body
    })
})

Then('Então eu devo obter uma questão', () => {
  expect(question.description).to.eql('teste')
})