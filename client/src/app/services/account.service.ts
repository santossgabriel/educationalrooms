import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { LoginModel } from '../account/account.models';

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
}