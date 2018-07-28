import { Component, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material'
import Swal from 'sweetalert2'
import { fadeInTransition } from '../../router.transition'
import { QuestionService } from '../../services/question.service'
import { Question } from '../../models/question.model'


@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css'],
  animations: [fadeInTransition],
  host: { '[@fadeInTransition]': '' }
})
export class AllQuestionsComponent implements OnInit {

  displayedColumns = ['area', 'category', 'description', 'answers', 'actions']
  dataSource: MatTableDataSource<Question>
  loading = false
  hasQuestions

  constructor(private service: QuestionService) { this.refresh() }

  ngOnInit() { }

  refresh() {
    this.loading = true
    this.service.getOthers().subscribe((questions: Question[]) => {
      this.loading = false
      this.dataSource = new MatTableDataSource(questions)
      this.hasQuestions = questions.length > 0
    }, err => this.loading = false)
  }

  getSharedQuestion(id: number) {
    this.service.getSharedQuestion(id).subscribe(() => {
      this.refresh()
    }, err => Swal('Oops...', err.error.message, 'error'))
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}