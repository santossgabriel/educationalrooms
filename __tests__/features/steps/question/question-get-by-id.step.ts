import { binding, given, when, then } from 'cucumber-tsflow'
import { expect } from 'chai'

import { createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class GetQuestionByIdSteps {

  private token = ''

  private question: any

  @given(/Dado que eu queira obter uma questão pelo id/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'questionmock3@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu buscar a questão/)
  async getQuestion() {
    return httpClient
      .get('/api/question/1')
      .set({ token: this.token })
      .then(res => this.question = res.body)
  }

  @then(/Então eu devo obter uma questão/)
  validateResult() {
    expect(this.question.description).to.eql('teste')
  }
}

export = GetQuestionByIdSteps