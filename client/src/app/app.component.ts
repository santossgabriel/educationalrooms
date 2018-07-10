import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  logged = false
  path: string

  constructor(private router: Router) {
    Globals.addTokenListener(this)
    this.logged = Globals.userLogged()
    router.events.subscribe((val: any) => {
      this.path = val.url
    })

    const socket = Globals.getSocket()
    socket.on('receiveRooms', rooms => {
      console.log(rooms)
      socket.emit('joinRoom', rooms[0])
    })
  }

  tokenChanged(newToken) {
    this.logged = Globals.userLogged()
  }
}