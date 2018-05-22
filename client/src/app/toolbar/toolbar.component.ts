import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, TokenChangedListener {

  logged = false
  path: string = '/'

  constructor(private router: Router) {
    Globals.addTokenListener(this)
    this.logged = Globals.userLogged()
    router.events.subscribe((val: any) => {
      this.path = val.url
    });
  }

  ngOnInit() {

  }

  logout() {
    Globals.changeToken(null)
    this.router.navigate(['/'])
  }

  tokenChanged(newToken) { this.logged = Globals.userLogged() }
}