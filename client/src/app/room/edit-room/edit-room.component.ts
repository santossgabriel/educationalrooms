import { Component, OnInit } from '@angular/core'
import { Globals } from '../../globals'
import { Router, ActivatedRoute, Params } from '@angular/router'
import Swal from 'sweetalert2'
import { MatDialog, MatTableDataSource } from '@angular/material'

import { fadeInTransition } from '../../router.transition'
import { Room } from '../../models/room.model'
import { RoomService } from '../../services/room.service'
import { RoomQuestionModalComponent } from '../../modals/room-question-modal.component'
import { RoomQuestion } from '../../models/room-question.model'

@Component({
  selector: 'app-rooms',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
  animations: [fadeInTransition],
  host: { '[@fadeInTransition]': '' }
})

export class EditRoomComponent implements OnInit {
  error = ''
  room = <Room>{}
  dataSource: MatTableDataSource<RoomQuestion>
  displayedColumns = ['order', 'category', 'description', 'points', 'actions']
  hasQuestions: boolean
  orderOption = 'id'
  orderOptions = [
    { description: 'PADRÃO', value: 'id' },
    { description: 'PONTOS', value: 'points' },
    { description: 'CATEGORIA', value: 'category' }
  ]
  loading = false

  constructor(private roomService: RoomService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      let roomId = params['id']
      if (roomId > 0) {
        this.loading = true
        this.roomService.get(roomId).subscribe(room => {
          this.loading = false
          this.room = <Room>room
          this.refresh()
        }, err => this.loading = false)
      } else
        this.room = new Room()
    })
  }

  ngOnInit() {
  }

  refresh() {
    this.dataSource = new MatTableDataSource(this.room.questions)
    this.hasQuestions = this.room.questions.length > 0
    this.room.questions.forEach((p, i) => p.order = i + 1)
  }

  remove(question: RoomQuestion) {
    question.points = 0
    this.room.questions = this.room.questions.filter(p => p.id !== question.id)
    this.refresh()
  }

  openQuestionModal() {
    const self = this
    const callback = (questions) => {
      questions.map(p => {
        p.points = p.points || 50
        self.room.questions.push(p)
      })
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

    if (this.room.questions.filter(p => !p.order).length > 0) {
      Swal('', 'Ordene as questões antes de prosseguir!', 'error')
      return
    }

    this.roomService.save(this.room).subscribe((res: any) => {
      Swal('Sucesso!', res.message, 'success').then(() => {
        this.router.navigate(['/my-rooms'])
      })
    }, err => Swal('Oops...', err.error.message, 'error'))
  }

  changeIndex(index, step) {

    const left = this.room.questions.filter(p => this.room.questions.indexOf(p) < index)
    const right = this.room.questions.filter(p => this.room.questions.indexOf(p) > index)
    const elem = this.room.questions.filter(p => this.room.questions.indexOf(p) === index).shift()

    if (step == 1) {
      const elemChange = right.shift()
      elemChange.order = index + 1
      elem.order = index + 2
      right.unshift(elemChange)
      right.unshift(elem)
    } else {
      const elemChange = left.pop()
      elemChange.order = index + 1
      elem.order = index
      left.push(elem)
      left.push(elemChange)
    }
    this.room.questions = left.concat(right)
    this.refresh()
  }

  sortQuestions(property) {
    this.room.questions.sort((n1, n2) => n1[property] > n2[property] ? 1 : n1[property] < n2[property] ? -1 : 0)
      .forEach((q, i) => {
        q.order = i + 1
      })
    this.refresh()
  }

  changePoints(q: RoomQuestion, points) {
    if (q.points % 10 !== 0)
      q.points = Math.floor(q.points / 10) * 10
    q.points += points
    if (q.points > 100)
      q.points = 100
    else if (q.points < 10)
      q.points = 10
  }

  orderOptionChanged() {
    this.sortQuestions(this.orderOption)
  }
}