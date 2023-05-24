import { binding, given, when, then } from 'cucumber-tsflow'

import { createHttpClient, validProps } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class SaveRoomSteps {

  private token = ''

  private resultMessage = ''


  @given(/Dado que eu queira alterar o status de uma sala/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'test_room@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu enviar o status (.*) para a sala de id (\d*)/)
  async sendStatus(status: string, id: string) {
    return httpClient
      .put('/api/room-status')
      .set({ token: this.token })
      .send({ id, status })
      .then(res => this.resultMessage = res.body.message)
  }

  @then(/Então eu devo obter a mensagem (.*) depois de alterar o status/)
  validateResult(json: string) {
    validProps(json, this.resultMessage)
  }

}

export = SaveRoomSteps