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
  MatSliderModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatSelectModule,
  MatCheckboxModule,
  MatMenuModule
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
    MatSliderModule,
    MatStepperModule,
    MatListModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule
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
    MatSliderModule,
    MatStepperModule,
    MatListModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule
  ],
  declarations: []
})
export class AppMaterialModule { }