import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Room } from '../models/room.model'

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getMy() {
    return this.http.get('/api/room-my')
  }

  save(room: Room) {
    if (room.id > 0)
      return this.http.put('/api/room', room)
    else
      return this.http.post('/api/room', room)
  }

  remove(id: number) {
    return this.http.delete('/api/room/' + id)
  }
}
