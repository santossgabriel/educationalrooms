import { Component, OnInit } from '@angular/core'
import { AccountService } from '../services/account.service'
import { Globals } from '../globals'
import { Router } from '@angular/router'
import { routerTransition } from '../router.transition'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginModel } from '../models/account.models'

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})

export class RoomsComponent implements OnInit, TokenChangedListener {

  error = ''

  constructor(private service: AccountService, private router: Router) {
    Globals.addTokenListener(this)
  }

  ngOnInit() {
  }

  tokenChanged(newToken) { }

  cleanError() {
    this.error = ''
  }
}