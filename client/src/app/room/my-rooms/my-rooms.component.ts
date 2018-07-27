import { Component, OnInit } from '@angular/core'
import { Globals } from '../../globals'
import { Router } from '@angular/router'
import { fadeInTransition } from '../../router.transition'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginModel } from '../../models/account.models'
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { ErrorModalComponent } from '../../modals/confirm-modal.component';
import { getStatusDescriptionRoom } from '../../helpers/utils';
import Swal from 'sweetalert2'
import { ScoresModalComponent } from '../../modals/scores-modal.component';
import { Notif } from '../../models/notification.models';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.component.html',
  styleUrls: ['./my-rooms.component.css'],
  animations: [fadeInTransition],
  host: { '[@fadeInTransition]': '' }
})

export class MyRoomsComponent implements OnInit, SocketConnectListener {

  error = ''
  displayedColumns = ['id', 'name', 'status', 'users', 'questions', 'seconds', 'actions']
  dataSource: MatTableDataSource<Room>
  hasRooms: boolean = false
  rooms: Room[] = []
  loading = true

  constructor(private service: RoomService,
    private router: Router,
    private dialog: MatDialog) {
    Globals.addSocketListener(this)
    this.loading = true
    this.service.getMy().subscribe((rooms: Room[]) => {
      this.loading = false
      this.rooms = rooms
      this.refresh()
    }, err => this.loading = false)
  }

  refresh() {
    this.rooms.map(p => p.descriptionStatus = getStatusDescriptionRoom(p))
    this.dataSource = new MatTableDataSource(this.rooms)
    this.hasRooms = this.rooms.length > 0
  }

  ngOnInit() {
  }

  cleanError() {
    this.error = ''
  }

  remove(room: Room) {
    this.service.remove(room.id).subscribe((res: any) => {
      this.rooms = this.rooms.filter(p => p.id !== room.id)
      this.refresh()
      Swal('Removido!', res.message, 'success')
    }, err => Swal('Oops...', err.error.message, 'error'))
  }

  editRoom(room: Room) {
    if (room) {
      if (room.descriptionStatus === 'FINALIZADA' || room.descriptionStatus === 'INICIADA') {
        Swal('Oops...', 'Uma sala Iniciada ou Finalizada não pode ser editada.', 'error')
        return
      }
      this.router.navigate([`/edit-room/${room.id}`])
    } else
      this.router.navigate(['/edit-room/0'])
  }

  changeStatus(room: Room, status: string) {
    this.service.changeStatus(room.id, status).subscribe(res => {
      let r = this.rooms.find(p => p.id === room.id)
      r.status = status

      switch (r.status) {
        case 'CLOSED':
          r.openedAt = r.startedAt = r.endedAt = null
          break
        case 'STARTED':
          r.startedAt = new Date()
          break
        case 'OPENED':
          r.openedAt = new Date()
          break
      }

      this.refresh()
    }, err => Swal('Oops...', err.error.message, 'error'))
  }

  openScores(r: Room): void {
    this.dialog.open(ScoresModalComponent, {
      data: { room: r }
    })
  }

  onConnect(socket: any) {
    socket.on('notificationReceived', (n: Notif) => {
      const id = Number(n.origin.split('-')[0])
      if (!isNaN(id)) {
        const room = this.rooms.find(p => p.id == id)
        if (room) {
          if (n.type === 'IN_ROOM') {
            room.users.push(new User())
          } else if (n.type === 'OUT_ROOM') {
            room.users.pop()
          }
        }
      }
    })
  }

  onDisconnect() {

  }
}