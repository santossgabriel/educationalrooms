import { Component, OnInit, Inject } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { NotifService } from '../services/notification.service';
import { Notif } from '../models/notification.models';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html'
})
export class NotificationModalComponent {

  notifications = <Notif[]>[]

  constructor(public dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotifService) {
    notificationService.get().subscribe(res => this.notifications = <Notif[]>res)
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}