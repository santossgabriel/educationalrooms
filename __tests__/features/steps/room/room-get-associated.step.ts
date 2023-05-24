import { binding, given, when, then } from 'cucumber-tsflow'

import { createHttpClient } from '../steps.helper'
import { assert } from 'chai'

const httpClient = createHttpClient()

@binding()
class GetAssociatedRoomsSteps {

  private token = ''

  private resultRooms: any

  @given(/Dado eu que queira obter as salas que participei/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'test_room@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu buscar as salas que participei/)
  async getRooms() {
    return httpClient
      .get('/api/room-associated')
      .set({ token: this.token })
      .then(res => this.resultRooms = res.body)
  }

  @then(/Então eu devo obter uma lista de salas que participei/)
  validateResult() {
    assert.isOk(!!this.resultRooms.length, 'Deve retornar pelo menos uma sala que o usuário participou.')
  }

}

export = GetAssociatedRoomsSteps