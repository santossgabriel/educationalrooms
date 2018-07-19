import { Injectable } from '@angular/core'
import { AccountService } from './account.service';
import { QuestionService } from './question.service';
import { UserDataModel } from '../models/user-data.models';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private accountService: AccountService,
    private questionService: QuestionService) {
  }

  getUser(): UserDataModel {
    return JSON.parse(localStorage.getItem('USER'))
  }

  setToken(token: string): void {
    if (token) {
      localStorage.setItem('TOKEN', token)
      this.accountService.getAccount().subscribe((user: UserDataModel) => {
        localStorage.setItem('USER', JSON.stringify(user))
        Globals.notifyUserChanged(user)
      }, err => {
        console.log(err)
      })
    } else {
      localStorage.removeItem('USER')
      localStorage.removeItem('TOKEN')
    }
  }
}