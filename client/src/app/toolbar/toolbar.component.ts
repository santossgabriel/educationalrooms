import { Component, OnInit } from '@angular/core'
import { Globals } from '../globals'
import { Router, NavigationEnd } from '@angular/router'
import { UserDataModel } from '../models/user-data.models'
import { AccountService } from '../services/account.service'
import { MatDialog } from '@angular/material'
import { NotificationModalComponent } from '../modals/notification-modal.component'
import { NotifService } from '../services/notification.service';
import { Notif } from '../models/notification.models';
import { dateToElapsedTime } from '../helpers/utils';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, TokenChangedListener {

  logged = false
  path: string
  user = <UserDataModel>{}
  notifications: Notif[] = []
  notifPendings: number = 0
  hasNoRead = false

  constructor(private router: Router,
    private accountService: AccountService,
    private notificationService: NotifService,
    public dialog: MatDialog) {
    Globals.addTokenListener(this)
    this.refresh()
    router.events.subscribe((val: any) => {
      this.path = val.url
    })

    const socket = Globals.getSocket()
    socket.on('notificationReceived', (n) => {
      this.notifications.unshift(n)
      this.updateTimeNotifications()
    })

    notificationService.get().subscribe((res: Notif[]) => {
      this.notifications = res
      this.updateTimeNotifications()
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
    const dialogRef = this.dialog.open(NotificationModalComponent, {})
  }

  updateTimeNotifications() {
    this.notifications.map(p => p.elapsedTime = dateToElapsedTime(new Date(p.createdAt)))
    this.notifPendings = this.notifications.filter(p => !p.read).length
    this.hasNoRead = this.notifPendings > 0
  }

  maskAsRead() {
    this.notificationService.maskAsRead().subscribe(res => {
      this.notifications.map(p => p.read = true)
      this.updateTimeNotifications()
    })
  }

  removeNotification(n: Notif) {
    this.notificationService.remove(n.id).subscribe(res => {
      this.notifications = this.notifications.filter(p => p.id !== n.id)
      this.updateTimeNotifications()
    })
  }

  removeAllnotifications() {
    this.notificationService.removeAll().subscribe(res => {
      this.notifications = []
      this.updateTimeNotifications()
    })
  }
}