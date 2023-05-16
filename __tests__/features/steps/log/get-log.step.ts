import { binding, given, when, then } from 'cucumber-tsflow'
import { expect } from 'chai'

import { validProps, createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class GetLogSteps {
  private token = ''
  private body: any = ''

  @given(/Dado que eu esteja logado com email (.*) e senha (.*)/)
  public givenLoggedUser(user: string, password: string): Promise<any> {
    return httpClient
      .post('/api/token')
      .send({ email: user, password: password })
      .expect(200)
      .then((result) => this.token = result.body.token)
  }

  @when(/Quando eu buscar os logs/)
  public getLogs(): Promise<any> {
    return httpClient
      .get('/api/log')
      .set({ token: this.token })
      .then((result) => this.body = result.body)
  }

  @then(/Então eu devo obter dos logs a mensagem (.*)/)
  public validarLogs(json: string): void {
    if (Array.isArray(this.body))
      expect('Logs retornados com sucesso.').to.eql(json)
    else {
      validProps(json, this.body.message)
    }
  }

}

export = GetLogSteps