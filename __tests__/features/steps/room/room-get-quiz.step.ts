import { binding, given, when, then } from 'cucumber-tsflow'
import { assert } from 'chai'

import { createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class GetOpenedRoomSteps {

  private token = ''

  private resultRoom: any

  @given(/Dado que eu queira obter um quiz que eu esteja participando/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'test_room@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu tentar obter o quiz/)
  async getRooms() {
    return httpClient
      .get('/api/room-quiz/1')
      .set({ token: this.token })
      .then(res => this.resultRoom = res.body)
  }

  @then(/Então eu devo obter o quiz com sucesso/)
  validateResult() {
    assert.isOk(this.resultRoom, 'Deveria retornar uma sala.')
  }

}

export = GetOpenedRoomSteps