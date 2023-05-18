import { binding, given, when, then } from 'cucumber-tsflow'
import { validProps, createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class DeleteQuestionSteps {

  private token = ''

  private resultMessage = ''

  @given(/que eu queira remover uma questão/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'questionmock3@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/eu tentar remover uma questão (.*) (\d*)/)
  async deleteQuestion(caso: string, id: string) {
    return httpClient
      .delete(`/api/question/${id}`)
      .set({ token: this.token })
      .then(res => this.resultMessage = res.body.message)
  }

  @then(/depois de tentar remover a questão eu devo obter a mensagem (.*)/)
  validateResult(json: string) {
    validProps(json, this.resultMessage)
  }

}

export = DeleteQuestionSteps