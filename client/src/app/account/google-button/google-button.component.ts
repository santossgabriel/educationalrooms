import { Component, OnInit } from '@angular/core'
import { AccountService } from '../../services/account.service'
import { Globals } from '../../globals'
import { Router } from '@angular/router'

@Component({
  selector: 'app-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.css']
})
export class GoogleButtonComponent implements OnInit {

  constructor(private service: AccountService, private router: Router) { }

  ngOnInit() { this.startGoogleApi() }

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
            this.router.navigate(['/my-questions'])
          })
        }, (error) => {
          console.log(JSON.stringify(error, undefined, 2))
        })
    })
  }
}