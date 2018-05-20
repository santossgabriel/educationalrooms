import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
    this.http.get('/api/token').subscribe(data => { console.log(data) })
  }

  login(name, password) {
    console.log(`Login: ${name} | ${password}`)
  }
}
