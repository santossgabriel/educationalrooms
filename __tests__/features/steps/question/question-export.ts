import { binding, given, when, then } from 'cucumber-tsflow'
import { assert } from 'chai'

import { createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class ExportQuestionSteps {

  private token = ''

  private questions: any

  @given(/Dado que eu queira exportar minhas questões cadastradas/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'questionmock3@mail.com', password: '123qwe' })
      .then(res => {
        this.token = res.body.token
      })
  }

  @when(/Quando eu chamar o método de exportar/)
  async exportQuestion() {
    return httpClient
      .get('/api/questions-export')
      .set({ token: this.token })
      .then(res => this.questions = JSON.parse(res.text))
  }

  @then(/Então quero obter um arquivo com as minhas questões exportadas/)
  validateResult() {
    assert.isOk(this.questions.length, 'Não retornou questões exportadas.')
  }

}

export = ExportQuestionSteps