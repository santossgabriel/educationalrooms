import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { fadeInTransition } from '../../router.transition'
import { Room } from '../../models/room.model'
import { RoomService } from '../../services/room.service'
import { MatDialog, MatTableDataSource } from '@angular/material'
import { Question } from '../../models/question.model';
import { Answer } from '../../models/answer.model';
import { Globals } from '../../globals';
import { SocketEvents } from '../../helpers/utils';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  animations: [fadeInTransition],
  host: { '[@fadeInTransition]': '' }
})

export class QuizComponent implements OnInit, TokenChangedListener {

  TIME_OVER = 'TIME_OVER'
  ANSWER = 'ANSWER'
  LOADING = 'LOADING'
  CORRECT = 'CORRECT'
  WRONG = 'WRONG'
  SENT = 'SENT'
  UNAVAILABLE = 'UNAVAILABLE'
  ENDED = 'ENDED'

  room = <Room>{}
  question = <Question>{}
  mode = 'LOADING'
  progress = 0
  answered = false
  socket: any
  step = 0

  constructor(private roomService: RoomService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {
    this.socket = Globals.getSocket()
    activatedRoute.params.subscribe((res: Params) => {
      roomService.getQuiz(res.id).subscribe((res: Room) => {
        this.room = res
        if (this.room) {
          this.socket.emit(SocketEvents.Server.IN_ROOM, res.id)
          this.step = 10 / this.room.time
        }
        else
          this.mode = this.UNAVAILABLE
      })
    })

    this.socket.on(SocketEvents.Client.QUESTION_RECEIVED, (q) => {
      console.log('QUESTION_RECEIVED')
      console.log(q)
      if (q.roomId == this.room.id) {
        this.question = q
        this.mode = q.answered ? this.SENT : this.ANSWER
        this.runTimer()
        this.progress = 0
      }
    })

    this.socket.on(SocketEvents.Client.FEEDBACK_ANSWER, (q) => {
      console.log('FEEDBACK')
      console.log(q)
      if (q.roomId == this.room.id) {
        this.question = q
        this.mode = q.feedback
      }
    })

    this.socket.on(SocketEvents.Client.FINISH_ROOM, (roomId) => {
      this.mode = this.ENDED
    })
  }

  ngOnInit() {
  }

  runTimer() {
    this.progress += this.step
    if (this.progress < 100 && !this.answered)
      setTimeout(() => {
        this.runTimer()
      }, 100)
    else if (!this.answered) {
      this.progress = 0
      this.mode = this.TIME_OVER
    }
  }

  tokenChanged(newToken) { }

  answer(a: Answer) {
    this.answered = true
    this.mode = this.SENT
    this.socket.emit(SocketEvents.Server.SEND_ANSWER, {
      roomId: this.room.id,
      questionId: this.question.id,
      answerId: a.id
    })
  }
}