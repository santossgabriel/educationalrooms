import { binding, given, when, then } from 'cucumber-tsflow'

import { createHttpClient, validProps } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class GetMyRoomsSteps {

  private token = ''

  private resultMessage: any


  @given(/Dado eu que queira entrar ou sair de uma sala/)
  async authenticate() {
    return httpClient
      .post('/api/token')
      .send({ email: 'questionmock1@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu entrar ou sair de uma sala (.*) atribuindo (.*)/)
  async sendRoom(caso: string, p: string) {

    const room = { id: 2, associate: true, time: 8 }

    if (p) {
      const props = JSON.parse(p)
      for (const key in props)
        (room as any)[key] = props[key]
    }

    return httpClient
      .put('/api/room-associate')
      .set({ token: this.token })
      .send(room)
      .then(res => this.resultMessage = res.body.message)

  }

  @then(/Então eu devo obter a mensagem (.*) depois de entrar ou sair da sala/)
  validateResult(json: string) {
    validProps(json, this.resultMessage)
  }

}

export = GetMyRoomsSteps