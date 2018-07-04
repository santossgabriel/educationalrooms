import { User } from "./user.model";
import { Question } from "./question.model";

export class Room {
  id: number
  name: string
  secondsStep: number
  createdAt: Date
  endedAt: Date
  userId: number
  questions: Question[]
  users: User[]
}