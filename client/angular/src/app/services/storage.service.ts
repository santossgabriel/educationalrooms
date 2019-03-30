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

  private keys = {
    USER: 'USER',
    TOKEN: 'TOKEN',
    SCORES: 'SCORES',
    AREAS: 'AREAS',
    TUTORIAL: 'TUTORIAL'
  }

  constructor(private accountService: AccountService,
    private questionService: QuestionService) {
  }

  getUser(): UserDataModel {
    return JSON.parse(localStorage.getItem(this.keys.USER))
  }

  setToken(token: string): void {
    if (token) {
      localStorage.setItem(this.keys.TOKEN, token)
      this.accountService.getAccount().subscribe((user: UserDataModel) => {
        localStorage.setItem(this.keys.USER, JSON.stringify(user))
        Globals.notifyUserChanged(user)
      }, err => {
        console.log(err)
      })
    } else {
      localStorage.removeItem(this.keys.USER)
      localStorage.removeItem(this.keys.TOKEN)
      localStorage.removeItem(this.keys.SCORES)
      localStorage.removeItem(this.keys.AREAS)
      localStorage.removeItem(this.keys.TUTORIAL)
      Globals.notifyUserChanged(null)
    }
  }

  setScores(scores: Scores): void {
    localStorage.setItem(this.keys.SCORES, JSON.stringify(scores))
  }

  getScores(): Scores {
    return JSON.parse(localStorage.getItem(this.keys.SCORES))
  }

  updateAreas(areas: string[]): void {
    let cats = this.getAreas()
    if (cats) {
      areas.concat(cats)
      areas = areas.filter((p, i) => areas.indexOf(p) === i)
    }
    localStorage.setItem(this.keys.AREAS, JSON.stringify(areas))
  }

  getAreas(): string[] {
    return JSON.parse(localStorage.getItem(this.keys.AREAS))
  }
}