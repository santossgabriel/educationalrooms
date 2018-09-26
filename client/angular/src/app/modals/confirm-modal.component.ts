import { Component, OnInit, Inject } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {
  title
  constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}

@Component({
  selector: 'app-error-modal',
  template: '<mat-icon style="font-size: 35px" color="warn">error</mat-icon>'
    + '<div class="error-modal">'
    + '<span>{{error}}</span><br />'
    + '<button mat-raised-button mat-dialog-close>OK</button></div>'
})
export class ErrorModalComponent {
  error
  constructor(public dialogRef: MatDialogRef<ErrorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.error = data.error
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}