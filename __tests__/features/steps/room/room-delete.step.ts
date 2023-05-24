import { binding, given, when, then } from 'cucumber-tsflow'

import { validProps, createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class DeleteRoomSteps {

  private token = ''

  private resultMessage: any

  @given(/Dado que eu queira remover uma sala/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'test_room@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu enviar o id de uma sala (.*) (\d*)/)
  async deleteRoom(caso: string, id: string) {
    return httpClient
      .delete(`/api/room/${id}`)
      .set({ token: this.token })
      .then(res => this.resultMessage = res.body.message)
  }

  @then(/Então eu devo obter a mensagem (.*) depois de tentar remover a sala/)
  validateResult(json: string) {
    validProps(json, this.resultMessage)
  }

}

export = DeleteRoomSteps