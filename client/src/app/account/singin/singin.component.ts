import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service'
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.transition';
import { LoginModel } from '../account.models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})

export class SinginComponent implements OnInit, TokenChangedListener {

  error = ''
  user: LoginModel = <LoginModel>{}

  constructor(private service: AccountService, private router: Router) {
    Globals.addTokenListener(this)
    if (Globals.currentToken())
      router.navigate(['/'])
  }

  ngOnInit() {
    this.user.email = new FormControl('', [Validators.required, Validators.email])
    this.user.password = new FormControl('', [Validators.required, Validators.minLength(6)])
    this.user.email.valueChanges.subscribe(() => { this.error = '' })
    this.user.email.valueChanges.subscribe(() => { this.error = '' })
  }

  loginUser() {
    this.service.login(this.user).subscribe(response => {
      this.error = ''
      const result: TokenResponse = <TokenResponse>response;
      Globals.changeToken(result.token)
      this.router.navigate(['/my-questions'])
    }, error => {
      this.error = error.error.message
    })
  }

  getEmailErrorMessage() {
    return this.user.email.hasError('required') ? 'Informe o email.' :
      this.user.email.hasError('email') ? 'Não é um email válido.' :
        '';
  }

  getPasswordErrorMessage() {
    return this.user.email.hasError('required') ? 'Informe a senha' : ''
  }

  tokenChanged(newToken) { }

  cleanError() {
    this.error = ''
  }

}