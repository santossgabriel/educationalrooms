import { binding, given, when, then } from 'cucumber-tsflow'

import { createHttpClient, validProps } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class MarkNotificationAsReadSteps {

    private token = ''

    private resultMessage = ''

    @given(/Dado que eu queira marcar minhas notificações como lidas/)
    async authenticate() {
        return httpClient
            .post('/api/token')
            .send({ email: 'test_room@mail.com', password: '123qwe' })
            .then(res => this.token = res.body.token)
    }

    @when(/Quando eu marcar minhas notificações como lidas/)
    async markAsRead() {
        return httpClient
            .put('/api/notification-read')
            .set({ token: this.token })
            .then(res => this.resultMessage = res.body.message)
    }

    @then(/Então eu devo obter um retorno de sucesso de notificações lidas (.*)/)
    validateResult(json: string) {
        validProps(json, this.resultMessage)
    }

}

export = MarkNotificationAsReadSteps