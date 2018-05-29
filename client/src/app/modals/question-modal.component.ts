import { Component, OnInit, Inject } from '@angular/core'
import { routerTransition } from '../router.transition'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html'
})
export class QuestionModalComponent {

  points: number

  constructor(public dialogRef: MatDialogRef<QuestionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close()
  }

  getLabel(value: number) {
    return `${value || 0} P`
  }

}