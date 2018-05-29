import { Component, OnInit } from '@angular/core'
import { routerTransition } from '../router.transition'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  text = `@ ${new Date().getFullYear()} Quiz Room - quizroom@gmail.com`

  constructor() { }

  ngOnInit() {
  }

}
