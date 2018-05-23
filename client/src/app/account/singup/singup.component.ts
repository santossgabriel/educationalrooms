import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.transition';
import { CreateAccountModel } from '../account.models';
import { AccountService } from '../../services/account.service';
import { Globals } from '../../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})
export class SingupComponent implements OnInit {

  user: CreateAccountModel = new CreateAccountModel()
  error: string = ''

  constructor(private service: AccountService, private router: Router) { }

  ngOnInit() {
  }

  createUser(form) {
    this.service.create(this.user).subscribe(response => {
      this.error = ''
      const result: TokenResponse = <TokenResponse>response;
      Globals.changeToken(result.token)
      this.router.navigate(['/my-questions'])
    }, err => {
      this.error = err.error.message
    })
  }

  cleanError() { this.error = '' }
}