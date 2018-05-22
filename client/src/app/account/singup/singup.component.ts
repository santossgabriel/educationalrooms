import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.transition';
import { CreateAccountModel } from '../account.models';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})
export class SingupComponent implements OnInit {

  user: CreateAccountModel = new CreateAccountModel()

  constructor() { }

  ngOnInit() {
  }

  createUser() {
    console.log(this.user)
  }

}
