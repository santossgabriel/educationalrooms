import { binding, given, when, then } from 'cucumber-tsflow'

import { validProps, createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class RequestWithoutToken {

  private response: any

  @given(/Dado que eu queira acessar um endpoint permissionado/)
  public initResponse() {
    this.response = {}
  }

  @when(/Quando eu não enviar o token/)
  public sendRequestWithoutToken(): Promise<any> {
    return httpClient
      .get('/api/question')
      .then((result) => {
        this.response = result.body.message
      })
  }

  @then(/Então eu devo obter o retorno (.*)/)
  public validadeResponse(json: string) {
    validProps(json, this.response)
  }

}

export = RequestWithoutToken