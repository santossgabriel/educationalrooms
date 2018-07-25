import { Component, OnInit } from '@angular/core'
import { fadeInTransition } from '../../router.transition'
import { QuestionService } from '../../services/question.service'
import { Question } from '../../models/question.model'
import { MatTableDataSource } from '@angular/material'

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css'],
  animations: [fadeInTransition],
  host: { '[@fadeInTransition]': '' }
})
export class AllQuestionsComponent implements OnInit {

  displayedColumns = ['id', 'area', 'description']
  dataSource: MatTableDataSource<Question>
  loading = false
  hasQuestions

  constructor(private service: QuestionService) {
    this.refresh()
  }

  ngOnInit() {
  }

  refresh() {
    this.loading = true
    this.service.getOthers().subscribe((questions: Question[]) => {
      this.loading = false
      this.dataSource = new MatTableDataSource(questions)
      this.hasQuestions = questions.length > 0
    }, err => this.loading = false)
  }
}