import { Component, OnInit } from '@angular/core'
import { AccountService } from '../../services/account.service'
import { Globals } from '../../globals'
import { Router } from '@angular/router'
import { fadeInTransition } from '../../router.transition'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginModel } from '../../models/account.models'

@Component({
  selector: 'app-rooms',
  templateUrl: './all-notifications.component.html',
  styleUrls: ['./all-notifications.component.css'],
  animations: [fadeInTransition],
  host: { '[@fadeInTransition]': '' }
})

export class AllNotificationsComponent implements OnInit {

  error = ''

  constructor(private service: AccountService, private router: Router) {
    const socket = Globals.getSocket()
    socket.emit('notificationReceived', { text: 'minha própria notificação' })
  }

  ngOnInit() {
  }

  cleanError() {
    this.error = ''
  }
}