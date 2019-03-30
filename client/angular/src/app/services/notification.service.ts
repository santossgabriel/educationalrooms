import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('/api/notification').map((p: any) => {
      p.createdAt = ''
      return p
    })
  }

  remove(id: number) {
    return this.http.delete('/api/notification/' + id)
  }

  removeAll() {
    return this.http.delete('/api/notification')
  }

  maskAsRead() {
    return this.http.put('/api/notification-read', null)
  }
}