import { binding, given, when, then } from 'cucumber-tsflow'

import { createHttpClient } from '../steps.helper'
import { assert } from 'chai'

const httpClient = createHttpClient()

@binding()
class GetMyRoomsSteps {

  private token = ''

  private resultRooms: any

  @given(/Dado que eu queira obter as salas que me pertencem/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'test_room@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu buscar as salas que me pertencem/)
  async getRooms() {
    return httpClient
      .get('/api/room-my')
      .set({ token: this.token })
      .then((result) => this.resultRooms = result.body)
  }

  @then(/Então eu devo obter uma lista de salas que me pertencem/)
  validateResult() {
    let ok = true
    for (const room of this.resultRooms)
      if (room.userId !== 6)
        ok = false
    assert.isOk(ok, 'Uma das salas não pertencem ao usuário')
    assert.isTrue(this.resultRooms.length > 0, 'Deve retornar pelo menos uma sala que pertence ao usuário.')
  }

}

export = GetMyRoomsSteps