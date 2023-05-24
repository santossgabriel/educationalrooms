import { binding, given, when, then } from 'cucumber-tsflow'
import { expect } from 'chai'

import { createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class GetMyRoomSteps {

  private token = ''

  private resultRoom: any

  @given(/Dado eu que queira obter minha sala/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'test_room@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu obter uma sala com id (\d*)/)
  async getRoom(id: string) {
    return httpClient
      .get(`/api/room/${id}`)
      .set({ token: this.token })
      .then(res => this.resultRoom = res.body)
  }

  @then(/Então a sala deve ter status (.*)/)
  validateResult(status: string) {
    expect(this.resultRoom.status).to.eql(status)
  }

}

export = GetMyRoomSteps