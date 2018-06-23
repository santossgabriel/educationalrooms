import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { assert, expect } from 'chai'
import {
  questionErros,
  answerErros
} from '../../../../src/helpers/error'

import app from '../../../../src/server'

const request = supertest(app)
let token
let synced
const questions = [
  // Descrição inválida
  { id: 7, description: '', updatedAt: new Date() },
  // Categoria inválida
  { id: 8, description: 'teste', category: '', updatedAt: new Date() },
  // Pontos inválidos
  { id: 9, description: 'teste', category: 'Matemárica', points: 11, updatedAt: new Date() },
  { id: 10, description: 'teste', category: 'Matemárica', points: 0, updatedAt: new Date() },
  { id: 11, description: 'teste', category: 'Matemárica', updatedAt: new Date() },
  // Número incorreto de respostas
  { id: 12, description: 'teste', category: 'Matemárica', points: 5, updatedAt: new Date() },
  // Questões corretas
  {
    description: 'teste',
    category: 'Matemárica',
    answers: [
      { description: 'teste1', classification: 'A' },
      { description: 'teste2', classification: 'B' },
      { description: 'teste3', classification: 'C', correct: true },
      { description: 'teste4', classification: 'D' }
    ],
    points: 8
  }, {
    description: 'teste',
    category: 'Matemárica',
    answers: [
      { description: 'teste1', classification: 'A' },
      { description: 'teste2', classification: 'B' },
      { description: 'teste3', classification: 'C', correct: true },
      { description: 'teste4', classification: 'D' }
    ],
    points: 8
  }
]

Given('Dado que eu tenha algumas questões para sincronizar', () => {
  return request
    .post('/api/token')
    .send({ email: 'test_sync@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando enviar as questões para o servidor', () => {
  return request
    .post('/api/question-sync')
    .set({ token: token })
    .send(questions)
    .then((result) => {
      synced = result.body
    })
})

Then('Então devo obter o retorno da sincronização', () => {
  const { errors, questions } = synced
  assert.isArray(errors)
  assert.isArray(questions)

  assert.isTrue(errors.length > 0, 'Deve retornar erros')
  
  assert.isTrue(errors.filter(p => p.exception === questionErros.BETWEEN_POINTS).length == 3, 'Deve ter 3 erros de pontos inválidos')
  assert.isTrue(errors.filter(p => p.exception === questionErros.HAS_CATEGORY).length == 1, 'Deve ter 1 erro de categoria inválida')
  assert.isTrue(errors.filter(p => p.exception === questionErros.HAS_DESCRIPTION).length == 1, 'Deve ter 1 erro de descrição da questão')
  assert.isTrue(errors.filter(p => p.exception === questionErros.HAS_FOUR_ANSWERS).length == 1, 'Deve ter 1 erro de questão com número de respostas inválido')
  // assert.isTrue(JSON.stringify(errors), '')
  //assert.isTrue(questions.length > 0, 'Deve retornar questões')
})