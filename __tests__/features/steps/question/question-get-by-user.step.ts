import { binding, given, when, then } from 'cucumber-tsflow'
import { assert } from 'chai'

import { createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class GetQuestionByUserSteps {

  private token = ''

  private questions: any

  @given(/Dado que eu esteja logado e queira obter minhas questões/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'questionmock3@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu buscar minhas questões/)
  async getQuestions() {
    return httpClient
      .get('/api/question')
      .set({ token: this.token })
      .then(res => this.questions = res.body)
  }

  @then(/Então eu devo obter somente as minhas questões/)
  validateResult() {
    let ok = true
    for (const question of this.questions)
      if (question.userId !== 3)
        ok = false
    assert.isOk(ok, 'Uma das questões não pertence ao usuário logado.')
  }
}

export = GetQuestionByUserSteps