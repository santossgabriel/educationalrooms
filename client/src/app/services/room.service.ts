import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Room } from '../models/room.model'

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  get(id: number) {
    return this.http.get(`/api/room/${id}`)
  }

  getMy() {
    return this.http.get('/api/room-my')
  }

  getOpened() {
    return this.http.get('/api/room-opened')
  }

  save(room: Room) {
    return this.http.post('/api/room', room)
  }

  remove(id: number) {
    return this.http.delete('/api/room/' + id)
  }
}
