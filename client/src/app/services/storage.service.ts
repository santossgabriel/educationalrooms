import { Injectable } from '@angular/core'
import { AccountService } from './account.service';
import { QuestionService } from './question.service';
import { UserDataModel } from '../models/user-data.models';
import { Globals } from '../globals';
import { Scores } from '../models/scores.models';

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
      localStorage.removeItem('SCORES')
      localStorage.removeItem('AREAS')
      localStorage.removeItem('TUTORIAL')
      Globals.notifyUserChanged(null)
    }
  }

  setScores(scores: Scores): void {
    localStorage.setItem('SCORES', JSON.stringify(scores))
  }

  getScores(): Scores {
    return JSON.parse(localStorage.getItem('SCORES'))
  }

  updateAreas(areas: string[]): void {
    let cats = this.getAreas()
    if (cats) {
      areas.concat(cats)
      areas = areas.filter((p, i) => areas.indexOf(p) === i)
    }
    localStorage.setItem('AREAS', JSON.stringify(areas))
  }

  getAreas(): string[] {
    return JSON.parse(localStorage.getItem('AREAS'))
  }
}