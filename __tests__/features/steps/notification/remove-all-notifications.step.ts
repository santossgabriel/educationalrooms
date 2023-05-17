import { binding, given, when, then } from 'cucumber-tsflow'

import { createHttpClient, validProps } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class RemoveAllNotificationsSteps {

    private token: string = ''

    private resultMessage = ''

    @given(/Dado remover todas minhas notificações/)
    authenticate(): Promise<any> {
        return httpClient
            .post('/api/token')
            .send({ email: 'test_room@mail.com', password: '123qwe' })
            .then(res => this.token = res.body.token)
    }

    @when(/Quando eu remover todas minhas notificações/)
    removeAllNotifications(): Promise<any> {
        return httpClient
            .delete('/api/notification')
            .set({ token: this.token })
            .then(res => this.resultMessage = res.body.message)
    }

    @then(/Então eu devo obter um retorno de sucesso de notificações removidas (.*)/)
    validadeResult(json: string) {
        validProps(json, this.resultMessage)
    }
}

export = RemoveAllNotificationsSteps