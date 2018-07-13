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

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.component.html',
  styleUrls: ['./my-rooms.component.css'],
  animations: [fadeInTransition],
  host: { '[@fadeInTransition]': '' }
})

export class MyRoomsComponent implements OnInit, TokenChangedListener {

  error = ''
  displayedColumns = ['id', 'name', 'status', 'users', 'questions', 'seconds', 'actions']
  dataSource: MatTableDataSource<Room>
  hasRooms: boolean = false
  rooms: Room[] = []

  constructor(private service: RoomService,
    private router: Router,
    private dialog: MatDialog) {
    this.service.getMy().subscribe((rooms: Room[]) => {
      this.rooms = rooms
      this.refresh()
    })
  }

  refresh() {
    this.rooms.map(p => p.descriptionStatus = getStatusDescriptionRoom(p))
    this.dataSource = new MatTableDataSource(this.rooms)
    this.hasRooms = this.rooms.length > 0
  }

  ngOnInit() {
  }

  tokenChanged(newToken) { }

  cleanError() {
    this.error = ''
  }

  remove(id) {
    this.service.remove(id).subscribe(res => {
      this.rooms = this.rooms.filter(p => p.id !== id)
      this.refresh()
    }, err => {
      console.error(err.error.message)
      this.dialog.open(ErrorModalComponent, {
        data: {
          error: err.error.message
        }
      })
    })
  }

  editRoom(id: number) {
    this.router.navigate([`/edit-room/${id}`])
  }

  changeStatus(room: Room, status: string) {
    this.service.changeStatus(room.id, status).subscribe(res => {
      let r = this.rooms.find(p => p.id === room.id)
      r.status = status
      this.refresh()
    })
  }
}