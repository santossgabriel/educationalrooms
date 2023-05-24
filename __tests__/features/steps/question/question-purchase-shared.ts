import { binding, given, when, then } from 'cucumber-tsflow'
import { expect } from 'chai'

import { createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class PurchaseSharedQuestionSteps {

  private token = ''

  private resultMessage: any

  @given(/Dado que eu queira adquirir uma questão compartilhada/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'questionmock3@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu solicitar uma questão compartilhada/)
  async purchaseSharedQuestion() {
    return httpClient
      .get('/api/question-get-shared/3')
      .set({ token: this.token })
      .then(res => this.resultMessage = res.body.message)
  }

  @then(/Então eu devo obter a questão compartilhada/)
  validateResult() {
    expect(this.resultMessage.en).to.eql('Question acquired successfully.')
  }

}

export = PurchaseSharedQuestionSteps