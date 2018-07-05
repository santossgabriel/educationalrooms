import { Component, OnInit, Inject } from '@angular/core'
import { routerTransition } from '../router.transition'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Question } from '../models/question.model'
import { QuestionService } from '../services/question.service'
import { Room } from '../models/room.model';
import { RoomService } from '../services/room.service';
import { ErrorModalComponent } from './confirm-modal.component';

@Component({
  selector: 'app-room-modal',
  templateUrl: './room-modal.component.html'
})
export class RoomModalComponent {

  room: Room
  questions: Question[]

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RoomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private roomService: RoomService, private questionService: QuestionService) {
    this.room = data.room
    questionService.getMy().subscribe(res => this.questions = <Question[]>res)
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  saveRoom() {
    this.roomService.save(this.room).subscribe(res => this.dialogRef.close(), err => {
      console.error(err.error.message)
      this.dialog.open(ErrorModalComponent, {
        data: {
          error: err.error.message
        }
      })
    })
  }
}