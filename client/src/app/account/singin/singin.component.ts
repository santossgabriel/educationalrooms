import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service'
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.transition';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})

export class SinginComponent implements OnInit, TokenChangedListener {

  error = ''

  constructor(private service: AccountService, private router: Router) {
    Globals.addTokenListener(this)
    if (Globals.currentToken())
      router.navigate(['/'])
  }

  loginUser(event) {
    event.preventDefault()
    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value
    this.service.login(email, password).subscribe(response => {
      this.error = ''
      const result: TokenResponse = <TokenResponse> response;
      Globals.changeToken(result.token)
      this.router.navigate(['/my-questions'])
    }, error => {
      this.error = error.error.message
    })
  }

  tokenChanged(newToken) { }

  ngOnInit() {
  }

}