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
  descriptionStatus: string
  status: string
  score: number

  constructor() {
    this.users = []
    this.questions = []
  }
}