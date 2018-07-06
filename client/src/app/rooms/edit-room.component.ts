import { Component, OnInit } from '@angular/core'
import { Globals } from '../globals'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { fadeInTransition } from '../router.transition'
import { Room } from '../models/room.model';
import { RoomService } from '../services/room.service';
import { RoomQuestionModalComponent } from '../modals/room-question-modal.component';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { RoomQuestion } from '../models/room-question.model';
import { ErrorModalComponent } from '../modals/confirm-modal.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
  animations: [fadeInTransition],
  host: { '[@fadeInTransition]': '' }
})

export class EditRoomComponent implements OnInit, TokenChangedListener {
  error = ''
  room = <Room>{}
  dataSource: MatTableDataSource<RoomQuestion>
  displayedColumns = ['order', 'category', 'description', 'points', 'actions']
  hasQuestions: boolean

  constructor(private roomService: RoomService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe((params: Params) => {
      let roomId = params['id']
      if (roomId > 0)
        this.roomService.get(roomId).subscribe(room => {
          this.room = <Room>room
          this.refresh()
        })
      else
        this.room = new Room()
    })
  }

  ngOnInit() {
  }

  refresh() {
    this.dataSource = new MatTableDataSource(this.room.questions)
    this.hasQuestions = this.room.questions.length > 0
  }

  remove(id: number) {
    this.room.questions = this.room.questions.filter(p => p.id !== id)
    this.refresh()
  }

  tokenChanged(newToken) { }

  openQuestionModal() {
    const self = this
    const callback = (questions) => {
      questions.map(p => self.room.questions.push(p))
      self.refresh()
    }
    this.dialog.open(RoomQuestionModalComponent, {
      data: {
        room: this.room,
        callback: callback
      }
    })
  }

  saveRoom() {
    this.roomService.save(this.room).subscribe(res => {
      this.router.navigate(['/rooms'])
    }, err => {
      console.error(err.error.message)
      this.dialog.open(ErrorModalComponent, {
        data: {
          error: err.error.message
        }
      })
    })
  }
}