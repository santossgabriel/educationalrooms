import { binding, given, when, then } from 'cucumber-tsflow'
import { assert } from 'chai'

import { createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class GetQuestionAreasSteps {

  private token = ''

  private areas: any

  @given(/Dado que eu queira obter áreas já cadastradas/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'questionmock3@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu buscar as áreas/)
  async getAreas() {
    return httpClient
      .get('/api/areas')
      .set({ token: this.token })
      .then(res => this.areas = res.body)
  }

  @then(/Então eu quero obter uma lista das áreas/)
  validateResult() {
    assert.isTrue(this.areas.length > 0, 'Deve retornar mais de uma áreas')
  }

}

export = GetQuestionAreasSteps