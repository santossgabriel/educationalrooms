import { Component, OnInit } from '@angular/core'
import { Globals } from '../globals'
import { Router } from '@angular/router'
import { routerTransition } from '../router.transition'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginModel } from '../models/account.models'
import { MatTableDataSource } from '@angular/material';
import { Room } from '../models/room.model';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})

export class RoomsComponent implements OnInit, TokenChangedListener {

  error = ''
  displayedColumns = ['id', 'name', 'users', 'questions', 'seconds', 'actions']
  // displayedColumns = ['id', 'name']
  dataSource: MatTableDataSource<Room>
  hasRooms: boolean = false

  constructor(private service: RoomService, private router: Router) {
    this.refresh()
  }

  refresh() {
    this.service.getMy().subscribe(questions => {
      const qs = <Room[]>questions
      console.log(qs)
      this.dataSource = new MatTableDataSource(<Room[]>questions)
      this.hasRooms = (<Room[]>questions).length > 0
    })
  }

  ngOnInit() {
  }

  tokenChanged(newToken) { }

  cleanError() {
    this.error = ''
  }

  remove(id) {

  }

  openRoomModal(room: Room) {

  }
}