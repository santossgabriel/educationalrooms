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

  displayedColumns = ['id', 'category', 'description']
  dataSource: MatTableDataSource<Question>

  constructor(private service: QuestionService) {
    this.refresh()
  }

  ngOnInit() {
  }

  refresh() {
    this.service.getOthers().subscribe(questions => {
      this.dataSource = new MatTableDataSource(<Question[]>questions)
    })
  }

}