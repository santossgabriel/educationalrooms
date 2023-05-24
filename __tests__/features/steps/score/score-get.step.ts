import { binding, given, when, then } from 'cucumber-tsflow'
import { assert } from 'chai'
import { createHttpClient } from '../steps.helper'


const httpClient = createHttpClient()

@binding()
class GetScores {

  private token = ''

  private resultScores: any

  @given(/Dado que eu queira obter minhas pontuações/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'test_room@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu buscar minhas pontuações/)
  async getScores() {
    return httpClient
      .get('/api/score')
      .set({ token: this.token })
      .then(res => this.resultScores = res.body)
  }

  @then(/Então eu devo obter minhas pontuações e de minhas salas/)
  validateResult() {
    assert.isArray(this.resultScores.myRoomsScores, `myRoomsScores: ${JSON.stringify(this.resultScores.myRoomsScores)}`)
    assert.isArray(this.resultScores.roomsScores, `roomsScores: ${JSON.stringify(this.resultScores.roomsScores)}`)
    assert.isArray(this.resultScores.allUserScores, `allUserScores: ${JSON.stringify(this.resultScores.questionsRoomScores)}`)
  }
}

export = GetScores