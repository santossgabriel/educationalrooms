import { Component, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material'
import { routerTransition } from '../../router.transition'
import { QuestionModalComponent } from '../../modals/question-modal.component'
import { Question } from '../../models/question.model'
import { QuestionService } from '../../services/question.service'
import { ConfirmModalComponent, ErrorModalComponent } from '../../modals/confirm-modal.component'

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css']
})
export class MyQuestionsComponent implements OnInit {

  displayedColumns = ['id', 'category', 'description', 'points', 'shared', 'actions']
  dataSource: MatTableDataSource<Question>
  hasQuestions: boolean = false

  constructor(public dialog: MatDialog, private service: QuestionService) {
    this.refresh()
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    
  }

  refresh() {
    this.service.getMy().subscribe(questions => {
      this.dataSource = new MatTableDataSource(<Question[]>questions)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.hasQuestions = (<Question[]>questions).length > 0
    })
  }

  openQuestionModal(question): void {
    this.dialog.open(QuestionModalComponent, {
      data: {
        question: question ? { ...question } : new Question(),
        callback: this.refresh
      }
    }).afterClosed().subscribe(() => {
      this.refresh()
    })
  }

  remove(id: number): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { title: 'Excluir o item selecionado ?' }
    })
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed)
        this.service.remove(id).subscribe(res => this.refresh(), err => {
          this.dialog.open(ErrorModalComponent, {
            data: {
              error: err.message
            }
          })
        })
    })
  }

  sharedChanged(q: Question) {
    console.log(q)
    this.service.save(q).subscribe(res => console.log(res), err => console.log(err))
  }
}