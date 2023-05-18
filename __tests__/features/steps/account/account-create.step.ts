import { binding, given, when, then } from 'cucumber-tsflow'

import { validProps, createHttpClient } from '../steps.helper'
import { CreateAccountModel } from '../../../../src/models'

const httpClient = createHttpClient()

@binding()
class AccountCreateSteps {

  private account: CreateAccountModel | undefined

  @given(/Dado que eu queira me cadastrar/)
  wantToCreateAccount() {
    this.account = {
      name: `teste${new Date().getMilliseconds()}`,
      email: `teste${new Date().getMilliseconds()}@mail.com`,
      password: '123qwe'
    }
  }

  @when(/Quando eu enviar (.*) atribuindo (.*)/)
  sendNewAccount(caso: string, prop: string) {
    if (prop === 'null')
      this.account = undefined
    else {
      const props = JSON.parse(prop)
      for (const key in props)
        (this.account as any)[key] = props[key]
    }
  }

  @then(/Ao tentar me cadastrar devo obter a mensagem (.*)/)
  async getMessage(json: string) {
    return httpClient
      .post('/api/account')
      .send(this.account)
      .then(res => validProps(json, res.body.message))
  }
}

export = AccountCreateSteps