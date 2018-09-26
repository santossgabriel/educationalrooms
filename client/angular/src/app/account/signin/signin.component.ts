import { Component, OnInit } from '@angular/core'
import { AccountService } from '../../services/account.service'
import { Globals } from '../../globals'
import { Router } from '@angular/router'
import { routerTransition } from '../../router.transition'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginModel } from '../../models/account.models'
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})

export class SigninComponent implements OnInit {

  error = ''
  user: LoginModel = new LoginModel()
  google: boolean

  constructor(private service: AccountService,
    private router: Router,
    private storageService: StorageService) {
    if (Globals.userLogged())
      router.navigate(['/'])
  }

  ngOnInit() {
    this.startGoogleApi()
  }

  loginUser() {
    this.service.login(this.user).subscribe(response => {
      this.error = ''
      const result: AccountResponse = <AccountResponse>response
      this.storageService.setToken(result.token)
      this.router.navigate(['/resume'])
    }, error => {
      this.error = error.error.message
    })
  }

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
    this.service.sendGoogleToken(user.googleToken).subscribe((user: AccountResponse) => {
      this.storageService.setToken(user.token)
      location.hash = '#/resume'
    })
  }

  cleanError() {
    this.error = ''
  }
}