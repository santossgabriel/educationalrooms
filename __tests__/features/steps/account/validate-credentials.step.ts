import { binding, given, when, then } from 'cucumber-tsflow'

import { validProps, createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class ValidateCredentialsSteps {

  private response: any

  @given(/Dado que eu esteja cadastrado/)
  public initResponse() { this.response = {} }

  @when(/Quando eu enviar as credenciais (.*)/)
  public sendCredentials(credentials: string): Promise<any> {
    return httpClient
      .post('/api/token')
      .send(JSON.parse(credentials))
      .then((result) => {
        this.response = result.body.message
      })
  }

  @then(/Para obter o token eu devo obter a mensagem (.*)/)
  public validateResponse(json: string) {
    validProps(json, this.response)
  }

}

export = ValidateCredentialsSteps