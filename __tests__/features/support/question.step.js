import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { expect } from 'chai'

import app from '../../../src/server'

const request = supertest(app)
let question = null

Given('Dado que eu tenha criado uma questão', () => {
  question = {
    description: 'teste',
    answers: [
      { description: 'teste' },
      { description: 'teste' },
      { description: 'teste', correct: true },
      { description: 'teste' }
    ],
    points: 8
  }
})

When('Quando eu criar {string} atribuindo {string}', (caso, property) => {
  if (property !== 'nenhuma alteração') {
    const prop = JSON.parse(property)
    const propertyName = Object.keys(prop)[0]
    question[propertyName] = prop[propertyName]
  }
})

Then('Então eu devo obter a mensagem {string} depois de tentar criar', (message) => {

  return request
    .post('/question')
    .send(question)
    .then((result) => {
      expect(result.body.message).to.eql(message)
    })
})

Given('Dado que eu tenha atualizado uma questão', () => {
  question = {
    description: 'teste',
    answers: [
      { description: 'teste' },
      { description: 'teste' },
      { description: 'teste', correct: true },
      { description: 'teste' }
    ],
    points: 8
  }
})

When('Quando eu atualizar {string} atribuindo {string}', (caso, property) => {
  if (property !== 'nenhuma alteração') {
    const prop = JSON.parse(property)
    const propertyName = Object.keys(prop)[0]
    question[propertyName] = prop[propertyName]
  }
})

Then('Então eu devo obter a mensagem {string} depois de tentar atualizar', (message) => {
  return request
    .put('/question')
    .send(question)
    .then((result) => {
      expect(result.body.message).to.eql(message)
    })
})