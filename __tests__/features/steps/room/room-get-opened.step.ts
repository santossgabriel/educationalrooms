import { binding, given, when, then } from 'cucumber-tsflow'

import { createHttpClient } from '../steps.helper'
import { assert } from 'chai'

const httpClient = createHttpClient()

@binding()
class GetOpenedRoomSteps {

  private token = ''

  private resultRooms: any

  @given(/Dado eu que queira obter as salas abertas/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'test_room@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu buscar as salas abertas/)
  async getRooms() {
    return httpClient
      .get('/api/room-opened')
      .set({ token: this.token })
      .then(res => this.resultRooms = res.body)
  }

  @then(/Então eu devo obter uma lista de salas abertas/)
  validateResult() {
    let ok = true

    for (const room of this.resultRooms)
      if (!room.openedAt || room.startedAt || room.endedAt)
        ok = false

    assert.isOk(ok, 'Uma das salas retornadas não está disponível.')
    assert.isOk(this.resultRooms.length > 0, 'Deve retornar pelo menos uma sala disponível.')
  }


}

export = GetOpenedRoomSteps