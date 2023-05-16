import { binding, given, when, then } from 'cucumber-tsflow'
import { expect } from 'chai'

import { createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class GetUserDataSteps {

  private token: string | undefined
  private email: string | undefined

  @given(/Dado que eu queira obter os dados da minha conta/)
  public login() {
    return httpClient
      .post('/api/token')
      .send({ email: 'questionmock1@mail.com', password: '123qwe' })
      .then(result => this.token = result.body.token)
  }

  @when(/Quando eu buscar os dados/)
  public getUserData() {
    return httpClient
      .get('/api/account')
      .set({ token: this.token })
      .then((result) => {
        this.email = result.body.email
      })
  }

  @then(/Então eu devo obter a propriedade Email igual a (.*)/)
  public validateResponse(expectedEmail: string) {
    expect(expectedEmail).to.eql(this.email)
  }
}

export = GetUserDataSteps