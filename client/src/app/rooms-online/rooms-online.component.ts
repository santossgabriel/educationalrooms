import { Component, OnInit } from '@angular/core'
import { AccountService } from '../services/account.service'
import { Globals } from '../globals'
import { Router } from '@angular/router'
import { fadeInTransition } from '../router.transition'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginModel } from '../models/account.models'

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms-online.component.html',
  styleUrls: ['./rooms-online.component.css'],
  animations: [fadeInTransition],
  host: { '[@fadeInTransition]': '' }
})

export class RoomsOnlineComponent implements OnInit, TokenChangedListener {

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