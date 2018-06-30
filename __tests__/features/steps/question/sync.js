import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { assert } from 'chai'
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
  // Sem data de atualização
  { id: 15, description: 'teste', category: 'Matemárica' },
  // Questão removida que será usada a versão do banco
  {
    id: 13,
    userId: 5,
    description: 'teste',
    points: 8,
    category: 'categoria 1',
    sync: 'U',
    updatedAt: new Date('6/27/2017'),
    answers: [
      { description: 'teste1', classification: 'A' },
      { description: 'teste2', classification: 'B' },
      { description: 'teste3', classification: 'C' },
      { description: 'teste4', classification: 'D', correct: true }
    ]
  },
  // Questão atualizada que será utilizada a versão do App
  {
    userId: 5,
    id: 14,
    description: 'questão 14',
    points: 8,
    shared: false,
    category: 'categoria 1',
    sync: 'U',
    updatedAt: new Date('6/26/2018'),
    answers: [
      { description: 'teste1', classification: 'A' },
      { description: 'teste2', classification: 'B' },
      { description: 'teste3', classification: 'C' },
      { description: 'teste4', classification: 'D', correct: true }
    ]
  },
  // Questão com resposta sem descrição
  {
    description: 'teste',
    category: 'Matemárica',
    answers: [
      { description: 'teste1', classification: 'A' },
      { description: 'teste2', classification: 'B' },
      { description: 'teste3', classification: 'C' },
      { description: '', classification: 'D' }
    ],
    points: 8
  },
  // Questão sem resposta correta
  {
    description: 'teste',
    category: 'Matemárica',
    answers: [
      { description: 'teste1', classification: 'A' },
      { description: 'teste2', classification: 'B' },
      { description: 'teste3', classification: 'C' },
      { description: 'teste4', classification: 'D' }
    ],
    points: 8
  },
  // Questão com resposta sem classificação
  {
    description: 'teste',
    category: 'Matemárica',
    answers: [
      { description: 'teste1' },
      { description: 'teste2', classification: 'B' },
      { description: 'teste3', classification: 'C', correct: true },
      { description: 'teste4', classification: 'D' }
    ],
    points: 8
  },
  // Questão com resposta com classificação divergente
  {
    description: 'teste',
    category: 'Matemárica',
    answers: [
      { description: 'teste1', classification: 'B' },
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
    .send({ questions: questions })
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
  assert.isTrue(errors.filter(p => p.exception === questionErros.SYNC_NO_UPDATED_DATE).length == 1, 'Deve ter 1 erro de questão sem data de atualização')
  assert.isTrue(errors.filter(p => p.exception === answerErros.HAS_DESCRIPTION).length == 1, 'Deve ter 1 erro de resposta sem descrição')
  assert.isTrue(errors.filter(p => p.exception === answerErros.HAS_CLASSIFICATION).length == 1, 'Deve ter 1 erro de resposta sem classificação')
  assert.isTrue(errors.filter(p => p.exception === answerErros.HAS_CLASSIFICATION_NEEDED).length == 1, 'Deve ter 1 erro de resposta com classificação divergente')
  assert.isTrue(errors.filter(p => p.exception === answerErros.HAS_CORRECT_ANSWER).length == 1, 'Deve ter 1 erro de questão sem resposta correta')
  assert.isTrue(errors.filter(p => p.exception === answerErros.HAS_CORRECT_ANSWER).length == 1, 'Deve ter 1 erro de questão sem resposta correta')

  assert.isTrue(questions.filter(p => p.id === 13 && p.sync === 'R').length === 0, 'Questão 13 deve ser removida.')
  assert.isTrue(questions.filter(p => p.description === 'questão 14').length === 1, 'Questão 14 deve ser atualizada pelo App.')
})