import { Component, OnInit } from '@angular/core'
import { routerTransition } from '../../router.transition'

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})
export class AllQuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
