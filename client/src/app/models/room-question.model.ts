import { Answer } from './answer.model'

export class RoomQuestion {
  id: number
  category: string
  description: string
  points: number
  selected: boolean
  order: number

  constructor() {
  }
}