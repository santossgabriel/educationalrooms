import { Component, OnInit } from '@angular/core'
import { Globals } from '../../globals'
import { Router } from '@angular/router'
import { fadeInTransition } from '../../router.transition'
import { RoomService } from '../../services/room.service'
import { MatTableDataSource } from '@angular/material'
import { RoomOpened } from '../../models/opened-room.models'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-rooms',
  templateUrl: './opened-rooms.component.html',
  styleUrls: ['./opened-rooms.component.css'],
  animations: [fadeInTransition],
  host: { '[@fadeInTransition]': '' }
})

export class OpenedRoomsComponent implements OnInit {

  displayedColumns = ['owner', 'name', 'users', 'questions', 'time', 'actions']
  dataSource: MatTableDataSource<RoomOpened>
  hasRooms: boolean = false

  constructor(private service: RoomService, private router: Router) {
    service.getOpened().subscribe((rooms: RoomOpened[]) => {
      this.dataSource = new MatTableDataSource(rooms)
      this.hasRooms = (rooms).length > 0
    })
  }

  ngOnInit() {
  }

  associate(room: RoomOpened) {
    this.service.associate(room).subscribe(res => {
      room.associate = !room.associate
      room.users += (room.associate ? 1 : -1)
    }, err => Swal('Oops...', err.error.message, 'error'))
  }

}