import { Component, OnInit } from '@angular/core'
import { Globals } from '../globals'
import { Router, NavigationEnd } from '@angular/router'
import { UserDataModel } from '../models/user-data.models';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, TokenChangedListener {

  logged = false
  path: string
  user = <UserDataModel>{}
  notifications = 0

  constructor(private router: Router, private accountService: AccountService) {
    Globals.addTokenListener(this)
    this.refresh()
    router.events.subscribe((val: any) => {
      this.path = val.url
    })

    const socket = Globals.getSocket()
    socket.on('notificationReceived', () => {
      this.notifications++
      console.log(this.notifications)
    })
  }

  ngOnInit() {

  }

  refresh() {
    this.logged = Globals.userLogged()
    if (this.logged) {
      this.accountService.getAccount().subscribe(res => { this.user = <UserDataModel>res })
    }
  }

  logout() {
    Globals.changeToken(null)
    this.router.navigate(['/signin'])
  }

  tokenChanged(newToken) { this.refresh() }

  clearNotifications() { this.notifications = 0 }
}
