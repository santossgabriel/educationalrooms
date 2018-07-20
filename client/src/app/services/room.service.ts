import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Room } from '../models/room.model'
import { RoomOpened } from '../models/opened-room.models';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  get(id: number) {
    return this.http.get(`/api/room/${id}`)
  }

  getQuiz(id: number) {
    return this.http.get(`/api/room-quiz/${id}`)
  }

  getMy() {
    return this.http.get('/api/room-my')
  }

  getAssociated() {
    return this.http.get('/api/room-associated')
  }

  getScores() {
    return this.http.get('/api/score')
  }

  associate(room: RoomOpened) {
    return this.http.put('/api/room-associate', {
      associate: !room.associate,
      id: room.id
    })
  }

  changeStatus(id: number, status: string) {
    return this.http.put('/api/room-status', {
      id: id,
      status: status
    })
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
