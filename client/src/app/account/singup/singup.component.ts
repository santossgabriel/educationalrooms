import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.transition';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})
export class SingupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  createUser(){
    
  }

}
