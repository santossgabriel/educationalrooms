import { Component, OnInit } from '@angular/core'
import { routerTransition } from '../../router.transition'
import { AccountService } from '../../services/account.service'
import { Globals } from '../../globals'
import { Router } from '@angular/router'
import { AccountModel } from '../../models/account.models'
import { UserDataModel } from '../../models/user-data.models';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})
export class SingupComponent implements OnInit {

  user: AccountModel = new AccountModel()
  error: string = ''
  message: string = ''
  editMode: boolean = false
  userAccount = <UserDataModel>{}
  token = ''

  constructor(private service: AccountService, private router: Router) { }

  ngOnInit() {
    if (this.router.isActive('/sign-edit', true)) {
      this.editMode = true
      this.service.getAccount().subscribe(res => {
        this.user = <AccountModel>res
        this.userAccount = <UserDataModel>res
      })
    }
    this.token = Globals.currentToken()
  }

  createUser(form) {
    this.service.save(this.user, this.editMode).subscribe(response => {
      this.error = ''
      const result: AccountResponse = <AccountResponse>response
      this.message = result.message
      if (!this.editMode)
        Globals.changeToken(result.token)
      setTimeout(() => {
        this.router.navigate(['/my-questions'])
      }, 1500)
    }, err => {
      this.error = err.error.message
    })
  }

  onUploadFinished(event) {
    const response = event.serverResponse.response
    if (!response.ok) {
      console.log(response)
      this.error = response._body
    } else {
      console.log(response)
      Globals.changeToken(Globals.currentToken())
      this.service.getAccount().subscribe(res => {
        this.user = <AccountModel>res
        this.userAccount = <UserDataModel>res
      })
    }
  }

  cleanError() { this.error = '' }
}
