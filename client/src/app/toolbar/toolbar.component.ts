import { Component, OnInit } from '@angular/core'
import swal from 'sweetalert2'
import { Globals } from '../globals'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { UserDataModel } from '../models/user-data.models'
import { AccountService } from '../services/account.service'
import { MatDialog } from '@angular/material'
import { NotificationModalComponent } from '../modals/notification-modal.component'
import { NotifService } from '../services/notification.service';
import { Notif } from '../models/notification.models';
import { dateToElapsedTime } from '../helpers/utils';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, UserChangedListener, SocketConnectListener {

  logged = false
  path: string
  user = <UserDataModel>{}
  notifications: Notif[] = []
  notifPendings: number = 0
  hasNoRead = false

  constructor(private router: Router,
    private accountService: AccountService,
    private notificationService: NotifService,
    private storageService: StorageService,
    public dialog: MatDialog,
    private activatedRouter: ActivatedRoute) {
    Globals.addUserChangedListener(this)
    Globals.addSocketListener(this)
    this.refresh()
    router.events.subscribe((val: any) => {
      this.path = val.url
    })

    accountService.getAccount().subscribe((user: UserDataModel) => {
      if (!this.user || !user || this.user.email !== user.email)
        this.logout()
    }, err => {
      this.logout()
    })
  }

  ngOnInit() {

  }

  refresh() {
    this.user = this.storageService.getUser()
    this.logged = this.user ? true : false
    if (this.logged) {
      this.notificationService.get().subscribe((res: Notif[]) => {
        this.notifications = res
        this.updateTimeNotifications()
      })
    }
  }

  logout() {
    this.storageService.setToken(null)
    this.router.navigate(['/signin'])
  }

  userChanged(newToken) { this.refresh() }

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

  onConnect(socket: any) {
    socket.on('notificationReceived', (n: Notif) => {
      this.notifications.unshift(n)
      this.updateTimeNotifications()
      if (n.type === 'ROOM_START' && this.path.indexOf('quiz') === -1) {
        const id = n.origin.split(' ')[0]
        swal('', `Sala ${n.origin.substring(id.length)} foi iniciada e você será redirecionado!`, 'info')
          .then(() => this.router.navigate([`quiz/${id}`]))
      }
    })
  }
  onDisconnect() {

  }
}