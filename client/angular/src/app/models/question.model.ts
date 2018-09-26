import { Answer } from './answer.model'

export class Question {
  id: number
  category: string
  area: string
  description: string
  shared: boolean
  answers: Answer[]
  order: number
  sharedQuestionId: number

  constructor() {
    this.answers = [
      <Answer>{ classification: 'A', correct: true },
      <Answer>{ classification: 'B' },
      <Answer>{ classification: 'C' },
      <Answer>{ classification: 'D' }
    ]
  }
}