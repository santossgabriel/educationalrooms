import { User } from "./user.model";
import { RoomQuestion } from "./room-question.model";

export class Room {
  id: number
  name: string
  time: number
  createdAt: Date
  endedAt: Date
  userId: number
  questions: RoomQuestion[]
  users: User[]

  constructor() {
    this.users = []
    this.questions = []
  }
}