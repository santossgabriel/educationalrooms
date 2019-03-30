import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { NotificationService } from '../services/notification.service';
import { Notification } from '../models/notification.models';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html'
})
export class NotificationModalComponent {

  notifications = <Notification[]>[]

  constructor(public dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService) {
    notificationService.get().subscribe((res: Notification[]) => this.notifications = res)
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}