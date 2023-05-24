import { binding, given, when, then } from 'cucumber-tsflow'
import { assert } from 'chai'

import { createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class GetScoreGraph {

  private token = ''

  private resultScores: any

  @given(/Dado que eu queira obter as pontuações para o gráfico/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'test_room@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu buscar as pontuações para o gráfico/)
  async getScores() {
    return httpClient
      .get('/api/score-graph')
      .set({ token: this.token })
      .then(res => this.resultScores = res.body)
  }

  @then(/Então eu devo obter as pontuações para o gráfico/)
  validateResult() {
    assert.isArray(this.resultScores, `scores: ${JSON.stringify(this.resultScores)}`)
  }
}

export = GetScoreGraph