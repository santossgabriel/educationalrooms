import { binding, given, when, then } from 'cucumber-tsflow'

import { validProps, createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class UpdateQuestionSharedSteps {

  private token = ''

  private resultMessage = ''

  @given(/Dado que eu queira alterar o compartilhamento de uma questão/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'questionmock3@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu enviar o id de uma (.*) (\d*) a ser ou não compartilhada/)
  async sendQuestion(caso: string, id: string) {
    return httpClient
      .put('/api/question-share')
      .set({ token: this.token })
      .send({ id, shared: true })
      .then(result => this.resultMessage = result.body.message)
  }

  @then(/Então eu devo obter a mensagem (.*) depois de alterar o compartilhamento/)
  validateResult(json: string) {
    validProps(json, this.resultMessage)
  }
}

export = UpdateQuestionSharedSteps