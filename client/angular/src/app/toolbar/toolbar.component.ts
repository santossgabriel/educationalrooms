import { Component, OnInit } from '@angular/core'
import swal from 'sweetalert2'
import { Globals } from '../globals'
import { Router } from '@angular/router'
import { UserDataModel } from '../models/user-data.models'
import { AccountService } from '../services/account.service'
import { MatDialog } from '@angular/material'
import { NotificationModalComponent } from '../modals/notification-modal.component'
import { NotificationService } from '../services/notification.service';
import { Notification } from '../models/notification.models';
import { dateToElapsedTime } from '../helpers/utils';
import { StorageService } from '../services/storage.service';
import { Tour, TourStep } from '../helpers/tour';
import { TutorialService } from '../services/tutorial.service';
import { AccountModel } from '../models/account.models';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, UserChangedListener, SocketConnectListener {

  logged = false
  path: string
  user = <UserDataModel>{}
  notifications: Notification[] = []
  notifPendings: number = 0
  hasNoRead = false

  constructor(private router: Router,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private tutorialService: TutorialService,
    public dialog: MatDialog) {
    Globals.addUserChangedListener(this)
    Globals.addSocketListener(this)
    this.refresh()
    router.events.subscribe((val: any) => {
      this.path = val.url
    })

    if (Globals.userLogged()) {
      accountService.getAccount().subscribe((user: UserDataModel) => {
        if (!this.user || !user || this.user.email !== user.email)
          this.logout()
      }, err => {
        this.logout()
      })
    }
  }

  ngOnInit() {
  }

  refresh() {
    this.user = this.storageService.getUser()
    this.logged = this.user ? true : false
    if (this.logged) {
      this.notificationService.get().subscribe((res: Notification[]) => {
        this.notifications = res
        this.updateTimeNotifications()
      })
    }
  }

  logout() {
    this.storageService.setToken(null)
    this.router.navigate(['/'])
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

  removeNotification(n: Notification) {
    this.notificationService.remove(n.id).subscribe(() => {
      this.notifications = this.notifications.filter(p => p.id !== n.id)
      this.updateTimeNotifications()
    })
  }

  removeAllnotifications() {
    this.notificationService.removeAll().subscribe(() => {
      this.notifications = []
      this.updateTimeNotifications()
    })
  }

  onConnect(socket: any) {
    socket.on('notificationReceived', (n: Notification) => {
      const arr = n.origin.split('-')
      if (arr.length > 0 && !isNaN(Number(arr[0])))
        n.origin = arr[1]
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

  help(type) {
    if (type === 'main') {
      Tour.menu()
    } else if (type === 'question') {
      if (this.path.indexOf('my-questions') === -1) {
        this.tutorialService.set(new TourStep('question', 0))
        this.router.navigate(['my-questions'])
      } else {
        Tour.question.step1(() => {
          const btn = <HTMLElement>(document.getElementById('createQuestion'))
          btn.click()
        })
      }
    } else if (type === 'room') {
      if (this.path.indexOf('edit-room') === -1) {
        this.tutorialService.set(new TourStep('room', 0))
        this.router.navigate(['/edit-room/0'])
      } else {
        Tour.room.step1()
      }
    }
  }
}