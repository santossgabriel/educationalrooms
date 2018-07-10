import { Component, OnInit } from '@angular/core'
import { AccountService } from '../../services/account.service'
import { Globals } from '../../globals'
import { Router } from '@angular/router'
import { routerTransition } from '../../router.transition'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginModel } from '../../models/account.models'

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css'],
  // animations: [routerTransition],
  // host: { '[@routerTransition]': '' }
})

export class SinginComponent implements OnInit, TokenChangedListener {

  error = ''
  user: LoginModel = new LoginModel()
  google: boolean

  constructor(private service: AccountService, private router: Router) {
    Globals.addTokenListener(this)
    if (Globals.currentToken())
      router.navigate(['/'])
  }

  ngOnInit() {
    this.startGoogleApi()
  }

  loginUser() {
    this.service.login(this.user).subscribe(response => {
      this.error = ''
      const result: AccountResponse = <AccountResponse>response
      Globals.changeToken(result.token)
      this.router.navigate(['/my-questions'])
    }, error => {
      this.error = error.error.message
    })
  }

  tokenChanged(newToken) { }

  startGoogleApi() {
    let auth2
    const googleApi = (<any>window).gapi
    googleApi.load('auth2', () => {
      auth2 = googleApi.auth2.init({
        client_id: Globals.getGoogleClientId(),
        cookiepolicy: 'single_host_origin'
      })
      auth2.attachClickHandler(document.getElementById('btnGoogle'), {},
        (googleUser) => {
          this.googleCallback(googleUser)
        }, (error) => {
          console.log(JSON.stringify(error, undefined, 2))
        })
    })
  }

  googleCallback(googleUser) {
    const perfil = googleUser.getBasicProfile();
    const user = {
      id: perfil.getId(),
      name: perfil.getName(),
      email: perfil.getEmail(),
      image: perfil.getImageUrl(),
      googleToken: googleUser.getAuthResponse().id_token
    }
    this.service.sendGoogleToken(user.googleToken).subscribe(res => {
      const result: AccountResponse = <AccountResponse>res
      Globals.changeToken(result.token)
      location.hash = '#/my-questions'
      

      // this.google = true
      // this.user.email.setValue(<string>user.email)
      // this.user.password.setValue('123456')
    })
  }

  cleanError() {
    this.error = ''
  }
}