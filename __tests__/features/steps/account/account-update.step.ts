import { binding, given, when, then } from 'cucumber-tsflow'

import { createHttpClient, validProps } from '../steps.helper'
import { CreateAccountModel } from '../../../../src/models'

const httpClient = createHttpClient()

@binding()
class AccountUpdateSteps {

  private account: CreateAccountModel | undefined
  private token: string | undefined

  @given(/Dado que eu queira atualizar meus dados/)
  async initAccount() {
    this.account = {
      name: 'questionmock1',
      email: 'questionmock1@mail.com',
      password: '123qwe'
    }
    return httpClient
      .post('/api/token')
      .send({ email: 'questionmock1@mail.com', password: '123qwe' })
      .then(res => this.token = res.body.token)
  }

  @when(/Quando eu atualizar meus dados (.*) atribuindo (.*)/)
  updateProperties(caso: string, p: string): void {
    if (p === 'null')
      this.account = undefined
    else {
      const props = JSON.parse(p)
      for (const key in props)
        (this.account as any)[key] = props[key]
    }
  }

  @then(/Então eu devo obter a mensagem (.*) ao tentar atualizar/)
  async validateResponse(json: string) {
    return httpClient
      .put('/api/account')
      .set({ token: this.token })
      .send(this.account)
      .then(res => validProps(json, res.body.message))
  }
}

export = AccountUpdateSteps