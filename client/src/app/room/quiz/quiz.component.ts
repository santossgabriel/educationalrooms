import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { fadeInTransition } from '../../router.transition'
import { Room } from '../../models/room.model'
import { RoomService } from '../../services/room.service'
import { MatDialog, MatTableDataSource } from '@angular/material'
import { Question } from '../../models/question.model';
import { Answer } from '../../models/answer.model';

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

  room = <Room>{}
  question = <Question>{}
  mode = 'LOADING'
  time = 0
  answered = false

  constructor(private roomService: RoomService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((res: Params) => {
      roomService.getQuiz(res.id).subscribe((res: Room) => this.room = res)
    })
    this.question = this.getQuestion()

    setTimeout(() => {
      this.mode = this.ANSWER
      this.runTimer()
    }, 1000);
  }

  ngOnInit() {
  }

  runTimer() {
    this.time++
    if (this.time < 100 && !this.answered)
      setTimeout(() => {
        this.runTimer()
      }, 100)
    else if (!this.answered) {
      this.time = 0
      this.mode = this.TIME_OVER
      setTimeout(() => {
        this.restart()
      }, 2000)
    }
  }

  tokenChanged(newToken) { }

  getQuestion(): Question {
    return <Question>{
      description: 'Quanto é 2 x 2 ?',
      points: 30,
      category: 'Matemática',
      answers: [
        <Answer>{ description: '4', classification: 'A', correct: true },
        <Answer>{ description: '2', classification: 'B' },
        <Answer>{ description: '6', classification: 'C' },
        <Answer>{ description: '8', classification: 'D' }
      ]
    }
  }

  restart() {
    this.answered = false
    this.mode = this.ANSWER
    this.runTimer()
  }

  answer(a: Answer) {
    this.answered = true
    this.mode = a.correct ? this.CORRECT : this.WRONG
    this.time = 0
    setTimeout(() => {
      this.restart()
    }, 2000)
  }
}