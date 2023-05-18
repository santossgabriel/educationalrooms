import { binding, given, when, then } from 'cucumber-tsflow'

import { validProps, createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class UpdateQuestionSteps {

  private token = ''

  private question = {}

  @given(/Dado que eu tenha atualizado uma questão/)
  async authenticate() {
    this.question = {
      id: 4,
      description: 'teste',
      userId: 3,
      difficulty: 1,
      area: 'area 1',
      answers: [
        { description: 'teste1', classification: 'A' },
        { description: 'teste2', classification: 'B' },
        { description: 'teste3', classification: 'C', correct: true },
        { description: 'teste4', classification: 'D' }
      ],
      points: 8
    }

    return httpClient
      .post('/api/token')
      .send({ email: 'questionmock3@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu atualizar a questão (.*) atribuindo (.*)/)
  setQuestionProps(caso: string, p: string) {
    if (p) {
      const props = JSON.parse(p)
      for (const key in props)
        (this.question as any)[key] = props[key]
    }
    else
      this.question = {}
  }

  @then(/Então eu devo obter a mensagem (.*) depois de tentar atualizar a questão/)
  async validateResult(json: string) {
    return httpClient
      .put('/api/question')
      .set({ token: this.token })
      .send(this.question)
      .then(res => validProps(json, res.body.message))
  }
}

export = UpdateQuestionSteps