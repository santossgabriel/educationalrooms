import { binding, given, when, then } from 'cucumber-tsflow'
import { assert } from 'chai'

import { createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class GetNotificationsSteps {

    private token: string = ''

    private notifications = []

    @given(/Dado que eu queira obter minhas notificações/)
    authenticate(): Promise<any> {
        return httpClient
            .post('/api/token')
            .send({ email: 'test_room@mail.com', password: '123qwe' })
            .then(res => this.token = res.body.token)
    }

    @when(/Quando eu buscar minhas notificações/)
    getNotifications(): Promise<any> {
        return httpClient
            .get('/api/notification')
            .set({ token: this.token })
            .then(res => this.notifications = res.body)
    }

    @then(/Então eu devo obter uma lista de notificações/)
    validateResult(): void {
        assert.isArray(this.notifications)
        assert.isTrue(!!this.notifications.length)
    }

}

export = GetNotificationsSteps