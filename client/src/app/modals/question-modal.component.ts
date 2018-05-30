import { Component, OnInit, Inject } from '@angular/core'
import { routerTransition } from '../router.transition'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Question } from '../models/question.model'
import { Answer } from '../models/answer.model'

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html'
})
export class QuestionModalComponent {

  points: number
  question: Question

  constructor(public dialogRef: MatDialogRef<QuestionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.question = data
    this.question.points = this.question.points || 1
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  correctClick(answer: Answer): void {
    setTimeout(() => {
      this.changeCorrect(answer)
    }, 10)
  }

  changeCorrect(answer: Answer): void {
    const answers = this.question.answers
    if (!answer.correct) {
      answers[0].correct = true
      return
    }

    for (let i = 0; i < answers.length; i++)
      if (answers[i].classification !== answer.classification) {
        answers[i].correct = false
      }
    console.log(answers)
  }

  getLabel(value: number) {
    return `${value || 0} P`
  }
}