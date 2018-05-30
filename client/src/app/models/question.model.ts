import { Answer } from './answer.model'

export class Question {
  id: number
  description: string
  points: number
  answers: Answer[]

  constructor() {
    this.answers = [
      <Answer>{ classification: 'A', correct: true },
      <Answer>{ classification: 'B' },
      <Answer>{ classification: 'C' },
      <Answer>{ classification: 'D' }
    ]
  }
}