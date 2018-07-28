import { Component, OnInit } from '@angular/core'
import { routerTransition } from '../../router.transition'
import { AccountService } from '../../services/account.service'
import { Globals } from '../../globals'
import { Router } from '@angular/router'
import { AccountModel } from '../../models/account.models'
import { UserDataModel } from '../../models/user-data.models'
import { StorageService } from '../../services/storage.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})
export class SignupComponent implements OnInit, UserChangedListener {

  user: AccountModel = new AccountModel()
  error: string = ''
  message: string = ''
  editMode: boolean = false
  userAccount = <UserDataModel>{}
  token = ''

  constructor(private accountService: AccountService,
    private router: Router,
    private storageService: StorageService) { }

  ngOnInit() {
    Globals.addUserChangedListener(this)
    if (this.router.isActive('/sign-edit', true)) {
      this.editMode = true
      this.userAccount = this.storageService.getUser()
      this.user = <any>this.userAccount
    }
    this.token = Globals.currentToken()
  }

  createUser(form) {
    this.accountService.save(this.user, this.editMode).subscribe((res: AccountResponse) => {
      this.error = ''
      this.message = res.message
      this.storageService.setToken(res.token)
      setTimeout(() => {
        this.router.navigate(['/my-questions'])
      }, 1500)
    }, err => {
      this.error = err.error.message
    })
  }

  onUploadFinished(event) {
    const response = event.serverResponse.response
    if (!response.ok)
      this.error = response._body
    else
      this.storageService.setToken(Globals.currentToken())
  }

  userChanged(user) {
    this.user = <AccountModel>user
    this.userAccount = <UserDataModel>user
  }

  cleanError() { this.error = '' }
}