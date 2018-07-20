export class Scores {
  myRoomScores: MyRoomScore[]
  roomsScores: RoomScore[]
  questionsRoomScores: QuestionRoomScore[]
}

class MyRoomScore {
  id: number
  name: string
  users: UserScore[]
}

class UserScore {
  id: number
  score: number
  name: string
  picture: string
}

class RoomScore {
  roomId: number
  score: number
  points: number
}

class QuestionRoomScore {
  id: number
  questions: QuestionScore[]
}

class QuestionScore {
  id: number
  order: number
  points: number
  description: string
  score: number
}