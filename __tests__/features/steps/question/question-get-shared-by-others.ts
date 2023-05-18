import { binding, given, when, then } from 'cucumber-tsflow'
import { assert } from 'chai'

import { createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class GetQuestionSharedByOthersSteps {

  private token = ''

  private questions: any

  @given(/Dado que eu queira obter as questões compartilhadas por outros usuários/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'questionmock3@mail.com', password: '123qwe' })
      .expect(200)
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu buscar as questões compartilhadas por outros usuários/)
  async getSharedQuestions() {
    return httpClient
      .get('/api/question-others')
      .set({ token: this.token })
      .expect(200)
      .then(res => this.questions = res.body)
  }

  @then(/Então eu devo obter somente as questões compartilhadas por outros usuários/)
  validateResult() {
    let ok = true
    for (const question of this.questions)
      if (question.userId === 3 || !question.shared)
        ok = false
    assert.isOk(ok, `Uma das questões pertencem ao usuário ou não está compartilhada. ${JSON.stringify(this.questions)}`)
  }

}

export = GetQuestionSharedByOthersSteps