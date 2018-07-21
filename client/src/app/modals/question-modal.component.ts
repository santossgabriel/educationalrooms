import { Component, OnInit, Inject } from '@angular/core'
import { routerTransition } from '../router.transition'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Question } from '../models/question.model'
import { Answer } from '../models/answer.model'
import { QuestionService } from '../services/question.service'
import { ErrorModalComponent } from './confirm-modal.component'
import swal from 'sweetalert2'
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html'
})
export class QuestionModalComponent {

  points: number
  question: Question
  selectedCategory
  categories: Array<string>
  customCategory: boolean
  callback: Function

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<QuestionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private questionService: QuestionService,
    private storageService: StorageService) {
    this.question = data.question
    this.callback = data.callback

    let cats = storageService.getCategories()
    if (cats && cats.length > 0) {
      this.categories = cats
      this.fillCategories()
    } else
      questionService.getCategories().subscribe((res: string[]) => {
        storageService.updateCategories(res)
        this.categories = res
        this.fillCategories()
      })
  }

  private fillCategories() {
    this.categories.push('Outra ...')
    this.selectedCategory = this.categories[0]
    this.categoryChanged()
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  correctClick(answer: Answer): void {
    setTimeout(() => {
      this.changeCorrect(answer)
    }, 50)
  }

  categoryChanged() {
    this.customCategory = this.categories.indexOf(this.selectedCategory) === (this.categories.length - 1)
    if (!this.customCategory)
      this.question.category = ''
  }

  changeCorrect(answer: Answer): void {
    const answers = this.question.answers
    for (let i = 0; i < answers.length; i++)
      answers[i].correct = false
    answer.correct = true
  }

  saveQuestion() {
    if (!this.customCategory)
      this.question.category = this.selectedCategory
    this.questionService.save(this.question).subscribe(res => {
      this.dialogRef.close()
    }, err => {
      swal('', err.error.message, 'error')
    })
  }

  getLabel(value: number) {
    return `${value || 0} P`
  }
}