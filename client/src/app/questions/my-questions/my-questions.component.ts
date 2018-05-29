import { Component, OnInit } from '@angular/core'
import { MatTableDataSource, MatDialog } from '@angular/material'
import { routerTransition } from '../../router.transition'
import { QuestionModalComponent } from '../../modals/question-modal.component'

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})
export class MyQuestionsComponent implements OnInit {
  displayedColumns = ['id', 'description', 'points', 'actions']
  dataSource = new MatTableDataSource(questions)
  constructor(public dialog: MatDialog) { this.openQuestionModal({}) }

  ngOnInit() {
  }

  openQuestionModal(question): void {
    const dialogRef = this.dialog.open(QuestionModalComponent, {
      data: { ...question }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }
}

const ELEMENT_DATA = [
  { id: 1, description: 'Hydrogen' },
  { id: 2, description: 'Helium' }
]

const questions = [{
  id: 1,
  description: 'Questão 1 dasdasmn dsanla s asjdas dasdas damsdas dmdas',
  points: 8,
  answers: [
    { id: 1, description: 'resposta 1', correct: false },
    { id: 2, description: 'resposta 2', correct: true },
    { id: 3, description: 'resposta 3', correct: false },
    { id: 4, description: 'resposta 4', correct: false }
  ]
}, {
  id: 2,
  description: 'Questão 2',
  points: 3,
  answers: [
    { id: 5, description: 'resposta 1', correct: false },
    { id: 6, description: 'resposta 2', correct: true },
    { id: 7, description: 'resposta 3', correct: false },
    { id: 8, description: 'resposta 4', correct: false }
  ]
}]