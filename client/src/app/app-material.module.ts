import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  MatButtonModule,
  MatInput,
  MatRadioButton,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatDialogModule,
  MatSliderModule
} from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatSliderModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatSliderModule
  ],
  declarations: []
})
export class AppMaterialModule { }