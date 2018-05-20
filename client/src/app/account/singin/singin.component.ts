import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service'

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {

  constructor(private service: AccountService) { }

  loginUser(event) {
    event.preventDefault()
    const target = event.target
    const name = target.querySelector('#name').value
    const password = target.querySelector('#password').value
    this.service.login(name, password)
  }

  ngOnInit() {
  }

}