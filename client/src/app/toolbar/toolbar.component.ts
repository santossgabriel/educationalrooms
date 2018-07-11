import { Component, OnInit } from '@angular/core'
import { Globals } from '../globals'
import { Router, NavigationEnd } from '@angular/router'
import { UserDataModel } from '../models/user-data.models'
import { AccountService } from '../services/account.service'
import { MatDialog } from '@angular/material'
import { NotificationModalComponent } from '../modals/notification-modal.component'

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

  constructor(private router: Router,
    private accountService: AccountService,
    public dialog: MatDialog) {
    Globals.addTokenListener(this)
    this.refresh()
    router.events.subscribe((val: any) => {
      this.path = val.url
    })

    const socket = Globals.getSocket()
    socket.on('notificationReceived', (n) => {
      this.notifications++
      console.log(n)
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

  openNotifications() {
    this.notifications = 0
    const dialogRef = this.dialog.open(NotificationModalComponent, {})
  }
}
