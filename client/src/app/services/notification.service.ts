import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('/api/notification')
  }

  remove(id: number) {
    return this.http.delete('/api/notification/' + id)
  }
}
