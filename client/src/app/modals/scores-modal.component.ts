import { Component, OnInit, Inject } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material'
import { StorageService } from '../services/storage.service';
import { Room } from '../models/room.model';
import { RoomService } from '../services/room.service';
import { MyRoomScore, Scores, UserScore } from '../models/scores.models';

@Component({
  selector: 'app-scores-modal',
  templateUrl: './scores-modal.component.html'
})
export class ScoresModalComponent {

  room: Room
  roomScores: MyRoomScore
  users: UserScore[]
  user: UserScore

  displayedColumns = ['picture', 'user', 'score']
  dataSource: MatTableDataSource<UserScore>

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<ScoresModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storageService: StorageService,
    private roomService: RoomService) {
    this.room = data.room
    this.updateScores()
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  updateScores() {

    let scores = this.storageService.getScores()
    if (scores)
      this.roomScores = scores.myRoomsScores.find(p => p.id == this.room.id)
    if (!this.roomScores)
      this.roomService.getScores().subscribe((res: Scores) => {
        this.storageService.setScores(res)
        this.roomScores = res.myRoomsScores.find(p => p.id == this.room.id)
      })

    if (this.roomScores) {
      this.users = this.roomScores.users
      this.dataSource = new MatTableDataSource(this.users)
      if (this.users.length > 0)
        this.showDetails(this.users[0])
    }
  }

  showDetails(user: UserScore) {
    this.user = this.user && user.id == this.user.id ? null : user
  }
}