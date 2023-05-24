import { binding, given, when, then } from 'cucumber-tsflow'

import { validProps, createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class RequestWithoutToken {

  private response: any

  @given(/Dado que eu queira acessar um endpoint permissionado/)
  initResponse() {
    this.response = {}
  }

  @when(/Quando eu não enviar o token/)
  async sendRequestWithoutToken() {
    return httpClient
      .get('/api/question')
      .then(res => this.response = res.body.message)
  }

  @then(/Então eu devo obter o retorno (.*)/)
  validadeResponse(json: string) {
    validProps(json, this.response)
  }

}

export = RequestWithoutToken