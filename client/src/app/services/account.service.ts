import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { LoginModel, AccountModel } from '../account/account.models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  login(login: LoginModel) {
    return this.http.post('/api/token', {
      email: login.email.value,
      password: login.password.value
    })
  }

  save(account: AccountModel, edit: boolean) {
    if (edit)
      return this.http.put('/api/account', account)
    else
      return this.http.post('/api/account', account)
  }

  getAccount() {
    return this.http.get('/api/account')
  }
}