import { Component, OnInit } from '@angular/core'
import { MatTableDataSource, MatDialog } from '@angular/material'
import { routerTransition } from '../../router.transition'
import { QuestionModalComponent } from '../../modals/question-modal.component'
import { Question } from '../../models/question.model'
import { QuestionService } from '../../services/question.service'

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})
export class MyQuestionsComponent implements OnInit {

  displayedColumns = ['id', 'description', 'points', 'actions']
  dataSource: MatTableDataSource<Question>

  constructor(public dialog: MatDialog, private service: QuestionService) {
    this.refresh()
  }

  ngOnInit() {
  }

  refresh() {
    this.service.getMy().subscribe(questions => {
      this.dataSource = new MatTableDataSource(<Question[]>questions)
    })
  }

  openQuestionModal(question): void {
    const dialogRef = this.dialog.open(QuestionModalComponent, {
      data: question ? { ...question } : new Question()
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.service.save(result).subscribe(res => this.refresh(), err => console.error(err))
    })
  }

  remove(id: number): void {
    this.service.remove(id).subscribe(res => this.refresh(), err => console.error(err))
  }
}