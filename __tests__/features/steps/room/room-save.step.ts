import { binding, given, when, then } from 'cucumber-tsflow'

import { createHttpClient, validProps } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class SaveRoomSteps {

  private token = ''

  private resultMessage = ''

  @given(/Dado eu que queira salvar uma sala/)
  async authenticate() {

    return httpClient
      .post('/api/token')
      .send({ email: 'test_room@mail.com', password: '123qwe' })
      .then((result) => this.token = result.body.token)
  }

  @when(/Quando enviar (.*) atribuindo (.*)/)
  async sendRoom(caso: string, p: string) {

    const room = {
      name: 'sala de mock test',
      questions: [
        { id: 16, order: 1, points: 80 },
        { id: 17, order: 2, points: 90 },
        { id: 18, order: 3, points: 100 }
      ],
      roomId: 1,
      time: 8
    }

    if (p) {
      const props = JSON.parse(p)
      for (const key in props)
        (room as any)[key] = props[key]
    }

    return httpClient
      .post('/api/room')
      .set({ token: this.token })
      .send(room)
      .then((result) => this.resultMessage = result.body.message)
  }

  @then(/Então eu devo obter a mensagem (.*) depois de salvar a sala/)
  validateResult(json: string) {
    validProps(json, this.resultMessage)
  }

}

export = SaveRoomSteps