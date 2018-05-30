import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Question } from '../models/question.model'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getMy() {
    return this.http.get('/api/question')
  }

  getOthers() {
    return this.http.get('/api/question-all')
  }

  save(question: Question) {
    if (question.id > 0)
      return this.http.put('/api/question', question)
    else
      return this.http.post('/api/question', question)
  }

  remove(id: number) {
    return this.http.delete('/api/question/' + id)
  }
}
