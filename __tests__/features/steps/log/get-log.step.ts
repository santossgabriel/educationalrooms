import { binding, given, when, then } from 'cucumber-tsflow'
import { expect } from 'chai'

import { validProps, createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class GetLogSteps {
  private token = ''
  private body: any = ''

  @given(/Dado que eu esteja logado com email (.*) e senha (.*)/)
  givenLoggedUser(user: string, password: string): Promise<any> {
    return httpClient
      .post('/api/token')
      .send({ email: user, password })
      .expect(200)
      .then((result) => this.token = result.body.token)
  }

  @when(/Quando eu buscar os logs/)
  getLogs(): Promise<any> {
    return httpClient
      .get('/api/log')
      .set({ token: this.token })
      .then((result) => this.body = result.body)
  }

  @then(/Então eu devo obter dos logs a mensagem (.*)/)
  validarLogs(json: string): void {
    if (Array.isArray(this.body))
      expect('Logs retornados com sucesso.').to.eql(json)
    else {
      validProps(json, this.body.message)
    }
  }

}

export = GetLogSteps