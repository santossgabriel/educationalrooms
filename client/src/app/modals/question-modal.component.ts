import { Component, OnInit, Inject } from '@angular/core'
import { routerTransition } from '../router.transition'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Question } from '../models/question.model'
import { Answer } from '../models/answer.model'
import { QuestionService } from '../services/question.service'
import { ErrorModalComponent } from './confirm-modal.component'
import swal from 'sweetalert2'
import { StorageService } from '../services/storage.service';
import { Tour } from '../helpers/tour';
import { TutorialService } from '../services/tutorial.service';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html'
})
export class QuestionModalComponent {

  points: number
  question: Question
  selectedArea
  areas: Array<string> = []
  customArea: boolean
  callback: Function
  categories = ['Iniciante', 'Intermediário', 'Avançado']

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<QuestionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private questionService: QuestionService,
    private storageService: StorageService,
    private tutorialService: TutorialService) {
    this.question = data.question
    this.callback = data.callback

    let cats = storageService.getAreas()
    if (cats && cats.length > 0) {
      this.areas = cats
      this.fillAreas()
    } else
      questionService.getAreas().subscribe((res: string[]) => {
        storageService.updateAreas(res)
        this.areas = res
        this.fillAreas()
      })

    const tutorial = tutorialService.get()
    if (tutorial && tutorial.type === 'question' && tutorial.step === 1) {
      setTimeout(() => {
        Tour.question.step2()
      }, 500)
    }
    this.question.category = this.categories[0]
  }

  private fillAreas() {
    this.areas.push('Outra ...')
    this.selectedArea = this.areas[0]
    this.areaChanged()
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  correctClick(answer: Answer): void {
    setTimeout(() => {
      this.changeCorrect(answer)
    }, 50)
  }

  areaChanged() {
    this.customArea = this.areas.indexOf(this.selectedArea) === (this.areas.length - 1)
    if (!this.customArea)
      this.question.area = ''
  }

  changeCorrect(answer: Answer): void {
    const answers = this.question.answers
    for (let i = 0; i < answers.length; i++)
      answers[i].correct = false
    answer.correct = true
  }

  saveQuestion() {
    if (!this.customArea)
      this.question.area = this.selectedArea
    this.questionService.save(this.question).subscribe(res => {
      this.dialogRef.close(true)
    }, err => {
      swal('', err.error.message, 'error')
    })
  }

  stepChange(step: number) {

    const tutorial = this.tutorialService.get()
    if (tutorial && tutorial.type === 'question') {
      if (step === 0 && tutorial.step === 2) {
        setTimeout(() => {
          Tour.question.step3()
        }, 500)
      } else if (step === 1 && tutorial.step === 3) {
        setTimeout(() => {
          Tour.question.step4()
        }, 500)
      } else if (step === 2 && tutorial.step === 4) {
        setTimeout(() => {
          Tour.question.step5()
        }, 500)
      }
    }
  }

  changeAnswer(n: number) {
    if (n < 0 && this.question.answers.length > 2)
      this.question.answers.pop()
    else if (n > 0 && this.question.answers.length < 6) {
      let answer: Answer = <Answer>{ classification: 'C' }
      if (this.question.answers.length === 3)
        answer.classification = 'D'
      else if (this.question.answers.length === 4)
        answer.classification = 'E'
      else if (this.question.answers.length === 5)
        answer.classification = 'F'
      this.question.answers.push(<Answer>answer)
    }
  }

  validQuestion(): boolean {
    let valid = true
    if (!this.question.description)
      return false
    if (!this.selectedArea)
      return false
    if (!this.question.category)
      return false
    this.question.answers.forEach(p => {
      if (!p.description)
        valid = false
    })
    return valid
  }
}