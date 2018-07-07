import { Component, OnInit } from '@angular/core'
import { AccountService } from '../../services/account.service'
import { Globals } from '../../globals'
import { Router } from '@angular/router'
import { fadeInTransition } from '../../router.transition'
import { RoomService } from '../../services/room.service';
import { MatTableDataSource } from '@angular/material';
import { RoomOpened } from '../../models/opened-room.models';

@Component({
  selector: 'app-rooms',
  templateUrl: './opened-rooms.component.html',
  styleUrls: ['./opened-rooms.component.css'],
  animations: [fadeInTransition],
  host: { '[@fadeInTransition]': '' }
})

export class OpenedRoomsComponent implements OnInit, TokenChangedListener {

  error = ''
  displayedColumns = ['owner', 'name', 'users', 'questions', 'time', 'actions']
  dataSource: MatTableDataSource<RoomOpened>
  hasRooms: boolean = false

  constructor(private service: RoomService, private router: Router) {
    Globals.addTokenListener(this)
    service.getOpened().subscribe((rooms: RoomOpened[]) => {
      this.dataSource = new MatTableDataSource(rooms)
      this.hasRooms = (rooms).length > 0
    })
  }

  ngOnInit() {
  }

  tokenChanged(newToken) { }

  cleanError() {
    this.error = ''
  }
}