import { Component, OnInit } from '@angular/core'
import { AccountService } from '../../services/account.service'
import { Globals } from '../../globals'
import { Router } from '@angular/router'
import { fadeInTransition } from '../../router.transition'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginModel } from '../../models/account.models'
import { MatTableDataSource } from '@angular/material'
import { RoomService } from '../../services/room.service'
import { RoomAssociated } from '../../models/room-associated.models';
import { getStatusDescriptionRoom } from '../../helpers/utils';

@Component({
  selector: 'app-rooms',
  templateUrl: './associated-rooms.component.html',
  styleUrls: ['./associated-rooms.component.css'],
  animations: [fadeInTransition],
  host: { '[@fadeInTransition]': '' }
})

export class AssociatedRoomsComponent implements OnInit {

  displayedColumns = ['name', 'status', 'time', 'score', 'actions']
  dataSource: MatTableDataSource<RoomAssociated>
  hasRooms

  constructor(private service: RoomService, private router: Router) {
    service.getAssociated().subscribe((rooms: RoomAssociated[]) => {
      rooms.map(p => p.descriptionStatus = getStatusDescriptionRoom(p))
      this.dataSource = new MatTableDataSource(rooms)
      this.hasRooms = (rooms).length > 0
    })
  }

  ngOnInit() {
  }

}