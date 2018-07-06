import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import { routerTransition } from '../router.transition'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material'
import { QuestionService } from '../services/question.service'
import { Room } from '../models/room.model';
import { RoomService } from '../services/room.service';
import { ErrorModalComponent } from './confirm-modal.component';
import { RoomQuestion } from '../models/room-question.model';

@Component({
  selector: 'app-room-question-modal',
  templateUrl: './room-question-modal.component.html'
})
export class RoomQuestionModalComponent {

  room: Room
  questions: RoomQuestion[]
  displayedColumns = ['category', 'description', 'points', 'selected']
  dataSource: MatTableDataSource<RoomQuestion>
  hasQuestions: boolean = false
  callback: Function

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RoomQuestionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private roomService: RoomService, private questionService: QuestionService) {
    this.room = data.room
    this.callback = data.callback
    this.questions = []
    const removedIds = this.room.questions.map(p => p.id)

    questionService.getMy().subscribe(questions => {
      this.questions = (<RoomQuestion[]>questions).filter(p => removedIds.indexOf(p.id) === -1)
      this.dataSource = new MatTableDataSource(this.questions)
      this.dataSource.paginator = this.paginator
      this.hasQuestions = (<RoomQuestion[]>questions).length > 0
    })
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  onNoClick(): void {
    this.dialogRef.close()
  }

  finishSelection() {
    this.callback(this.questions.filter(p => p.selected))
    this.dialogRef.close()
  }
}