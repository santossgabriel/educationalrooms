import { binding, given, when, then } from 'cucumber-tsflow'

import { createHttpClient, validProps } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class RemoveNotificationSteps {

    private token: string = ''

    private resultMessage = ''

    @given(/Dado que eu queira remover a notificação/)
    authenticate() {
        return httpClient
            .post('/api/token')
            .send({ email: 'test_room@mail.com', password: '123qwe' })
            .then(res => this.token = res.body.token)
    }

    @when(/Quando eu remover uma notificação de id (\d*)/)
    removeNotification(id: string) {
        return httpClient
            .delete(`/api/notification/${id}`)
            .set({ token: this.token })
            .then(res => this.resultMessage = res.body.message)
    }

    @then(/Então eu devo receber a mensagem (.*) depois de remover a notificação/)
    validateResult(json: string) {
        validProps(json, this.resultMessage)
    }
}

export = RemoveNotificationSteps