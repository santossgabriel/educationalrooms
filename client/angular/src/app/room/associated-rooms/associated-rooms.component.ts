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
import { Scores, AllUserScores } from '../../models/scores.models';
import { StorageService } from '../../services/storage.service';
import { UserDataModel } from '../../models/user-data.models';

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
  loading = false
  userScores: AllUserScores[]
  user: UserDataModel

  constructor(private roomService: RoomService,
    private storageService: StorageService,
    private router: Router) {
    this.loading = true
    this.user = storageService.getUser()
    roomService.getAssociated().subscribe((rooms: RoomAssociated[]) => {
      this.loading = false
      rooms.map(p => p.descriptionStatus = getStatusDescriptionRoom(p))
      this.dataSource = new MatTableDataSource(rooms)
      this.hasRooms = (rooms).length > 0
      if (this.hasRooms)
        this.updateScores()
    }, err => this.loading = false)
  }

  ngOnInit() {
  }

  openScores(room: RoomAssociated) {
    const scores = this.storageService.getScores()
    if (scores || scores.allUserScores) {
      this.userScores = scores.allUserScores.filter(p => p.roomId === room.id) || []
      console.log(this.userScores)
      if (this.userScores.length > 0)
        return
    }
    this.roomService.getScores().subscribe((res: Scores) => {
      this.storageService.setScores(res)
      this.updateRoomsScores(res)
      this.userScores = res.allUserScores.filter(p => p.roomId === room.id) || []
    })
  }

  updateScores() {

    let scores = this.storageService.getScores()
    if (scores) {
      const roomIds = scores.roomsScores.map(p => p.roomId)
      if (this.dataSource.data.filter(p => p.endedAt && roomIds.indexOf(p.id) == -1).length === 0) {
        this.updateRoomsScores(scores)
        return
      }
    }
    this.roomService.getScores().subscribe((res: Scores) => {
      this.storageService.setScores(res)
      this.updateRoomsScores(res)
    })
  }

  updateRoomsScores(scores: Scores) {
    this.dataSource.data.forEach(p => {
      const roomScore = scores.allUserScores.find(x => x.roomId == p.id && x.userId == this.user.id)
      if (roomScore)
        p.score = roomScore.score
    })
  }
}