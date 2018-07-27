import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Question } from '../models/question.model'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getMy() { return this.http.get('/api/question') }

  getOthers() { return this.http.get('/api/question-others') }

  getAreas() { return this.http.get('/api/areas') }

  save(question: Question) {
    if (question.id > 0)
      return this.http.put('/api/question', question)
    else
      return this.http.post('/api/question', question)
  }

  share(question: Question) { return this.http.put('/api/question-share', question) }

  getSharedQuestion(id: number) { return this.http.get(`/api/question-get-shared/${id}`) }

  remove(id: number) { return this.http.delete('/api/question/' + id) }
}