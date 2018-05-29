import { Component, OnInit, Inject } from '@angular/core'
import { routerTransition } from '../router.transition'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Question } from '../models/question.model'

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
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  getLabel(value: number) {
    return `${value || 0} P`
  }
}