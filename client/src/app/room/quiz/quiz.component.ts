import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import Swal from 'sweetalert2'
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

export class QuizComponent implements OnInit, SocketConnectListener {

  TIME_OVER = 'TIME_OVER'
  ANSWER = 'ANSWER'
  LOADING = 'LOADING'
  CORRECT = 'CORRECT'
  WRONG = 'WRONG'
  SENT = 'SENT'
  UNAVAILABLE = 'UNAVAILABLE'
  ENDED = 'ENDED'
  DISCONNECTED = 'DISCONNECTED'

  room = <Room>{}
  question = <Question>{}
  mode = 'LOADING'
  progress = 0
  answered = false
  socket
  step = 0

  constructor(private roomService: RoomService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {
    console.log('quiz constructor')
    Globals.addSocketListener(this)
    activatedRoute.params.subscribe((res: Params) => {
      roomService.getQuiz(res.id).subscribe((res: Room) => {
        this.room = res
        if (this.room && !this.room.endedAt) {
          this.step = 10 / this.room.time
          this.socket = Globals.getSocket()
          if (this.socket)
            this.initSocket()
        } else if (this.room.endedAt)
          this.mode = this.ENDED
        else
          this.mode = this.UNAVAILABLE
      }, err => Swal('Oops...', err.error.message, 'error').then(() => console.log('CALLBACK')))
    })
  }

  ngOnInit() {

  }

  runTimer() {
    // this.progress += this.step
    // if (this.progress < 100 && !this.answered)
    //   setTimeout(() => {
    //     this.runTimer()
    //   }, 100)
    // else if (!this.answered) {
    //   this.progress = 0
    //   this.mode = this.TIME_OVER
    // }
  }

  answer(a: Answer) {
    this.answered = true
    this.mode = this.SENT
    this.socket.emit(SocketEvents.Server.SEND_ANSWER, {
      roomId: this.room.id,
      questionId: this.question.id,
      answerId: a.id
    })
  }

  initSocket() {

    if (this.room && this.room.id > 0) {
      this.socket.emit(SocketEvents.Server.IN_ROOM, this.room.id)

      this.socket.on(SocketEvents.Client.QUESTION_RECEIVED, (q) => {
        if (q.roomId == this.room.id) {
          this.question = q
          this.mode = q.answered ? this.SENT : this.ANSWER
          this.runTimer()
          this.progress = 0
        }
      })

      this.socket.on(SocketEvents.Client.FEEDBACK_ANSWER, (q) => {
        if (q.roomId == this.room.id) {
          this.question = q
          this.mode = q.feedback
        }
      })

      this.socket.on(SocketEvents.Client.FINISH_ROOM, res => {
        if (res.roomId == this.room.id) {
          this.room.score = res.score || 0
          this.mode = this.ENDED
        }
      })
    }
  }

  onDisconnect() {
    this.mode = this.DISCONNECTED
  }

  onConnect() { }
}