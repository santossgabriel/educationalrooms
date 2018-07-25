import { Component, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material'
import { fadeInTransition } from '../../router.transition'
import { QuestionModalComponent } from '../../modals/question-modal.component'
import { Question } from '../../models/question.model'
import { QuestionService } from '../../services/question.service'
import { ConfirmModalComponent, ErrorModalComponent } from '../../modals/confirm-modal.component'
import { StorageService } from '../../services/storage.service';
import { Tour } from '../../helpers/tour';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css'],
  animations: [fadeInTransition],
  host: { '[@fadeInTransition]': '' }
})
export class MyQuestionsComponent implements OnInit {

  displayedColumns = ['id', 'area', 'description', 'shared', 'actions']
  dataSource: MatTableDataSource<Question>
  hasQuestions: boolean = false
  loading = true

  constructor(public dialog: MatDialog,
    private questionService: QuestionService,
    private storageService: StorageService,
    private tutorialService: TutorialService) {
    this.refresh()
  }

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit() {
  }

  refresh() {
    this.loading = true
    this.questionService.getMy().subscribe((questions: Question[]) => {
      this.loading = false
      this.dataSource = new MatTableDataSource(questions)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.hasQuestions = questions.length > 0
      this.storageService.updateAreas(questions.map(p => p.area))
      questions.map(p => p.area)

      const tutorial = this.tutorialService.get()
      if (tutorial && tutorial.type === 'question') {
        if (tutorial.step === 0) {
          setTimeout(() => {
            Tour.question.step1(() => {
              this.openQuestionModal(null)
            })
          }, 500)
        } else if (tutorial.step === 5) {
          setTimeout(() => {
            Tour.question.step6()
          }, 500)
        }
      }
    }, err => this.loading = false)
  }

  openQuestionModal(question): void {
    this.dialog.open(QuestionModalComponent, {
      data: {
        question: question ? { ...question } : new Question(),
        callback: this.refresh
      }
    }).afterClosed().subscribe((res) => {
      if (res)
        this.refresh()
    })
  }

  remove(id: number): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { title: 'Excluir o item selecionado ?' }
    })
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed)
        this.questionService.remove(id).subscribe(res => this.refresh(), err => {
          this.dialog.open(ErrorModalComponent, {
            data: {
              error: err.message
            }
          })
        })
    })
  }

  sharedChanged(q: Question) {
    this.questionService.save(q).subscribe(res => console.log(res), err => console.log(err))
  }
}