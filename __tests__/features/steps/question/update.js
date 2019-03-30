import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'

import { validProps } from '../stepsHelper'
import app from '../../../../src/server'

const request = supertest(app)
let question = null
let token = ''
let msgShare = 'teste'

Given('Dado que eu tenha atualizado uma questão', () => {
  question = {
    id: 4,
    description: 'teste',
    userId: 3,
    difficulty: 1,
    area: 'area 1',
    answers: [
      { description: 'teste1', classification: 'A' },
      { description: 'teste2', classification: 'B' },
      { description: 'teste3', classification: 'C', correct: true },
      { description: 'teste4', classification: 'D' }
    ],
    points: 8
  }

  return request
    .post('/api/token')
    .send({ email: 'questionmock3@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu atualizar {string} atribuindo {string}', (caso, p) => {
  if (p) {
    const props = JSON.parse(p)
    for (let key in props)
      question[key] = props[key]
  }
  else
    question = null
})

Then('Então eu devo obter a mensagem {string} depois de tentar atualizar', (json) => {
  return request
    .put('/api/question')
    .set({ token: token })
    .send(question)
    .then((result) => validProps(json, result.body.message))
})

Given('Dado que eu queira alterar o compartilhamento de uma questão', () => {
  return request
    .post('/api/token')
    .send({ email: 'questionmock3@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu enviar o id de uma {string} {int} a ser ou não compartilhada', (caso, id) => {
  return request
    .put('/api/question-share')
    .set({ token: token })
    .send({ id: id, shared: true })
    .then(result => msgShare = result.body.message)
})

Then('Então eu devo obter a mensagem {string} depois de alterar o compartilhamento', (json) => {
  validProps(json, msgShare)
})