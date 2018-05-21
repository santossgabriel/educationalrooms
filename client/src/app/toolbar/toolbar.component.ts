import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, TokenChangedListener {

  logged = false

  constructor(private router: Router) {
    Globals.addTokenListener(this)
    this.logged = Globals.userLogged()
  }

  ngOnInit() {

  }

  logout() {
    Globals.changeToken(null)
    this.router.navigate(['/'])
  }

  tokenChanged(newToken) { this.logged = Globals.userLogged() }
}