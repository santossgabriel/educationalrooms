import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'

import { validProps } from '../stepsHelper'
import app from '../../../../src/server'

const request = supertest(app)
let account = null

/**
 * Criar cadastro
 */
Given('Dado que eu queira me cadastrar', () => {
  account = {
    name: `teste${new Date().getMilliseconds()}`,
    email: `teste${new Date().getMilliseconds()}@mail.com`,
    password: '123qwe'
  }
})

When('Quando eu enviar {string} atribuindo {string}', (caso, p) => {
  if (p === 'null')
    account = null
  else {
    const props = JSON.parse(p)
    for (let key in props)
      account[key] = props[key]
  }
})

Then('Então eu devo obter a mensagem {string} ao tentar me cadastrar', (json) => {
  return request
    .post('/api/account')
    .send(account)
    .then((result) => validProps(json, result.body.message))
})
