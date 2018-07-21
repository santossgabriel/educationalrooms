export class Scores {
  myRoomsScores: MyRoomScore[]
  roomsScores: RoomScore[]
  questionsRoomScores: QuestionRoomScore[]
  allUserScores: AllUserScores[]
}

export class MyRoomScore {
  id: number
  name: string
  users: UserScore[]
}

export class UserScore {
  id: number
  score: number
  name: string
  picture: string
}

export class RoomScore {
  roomId: number
  score: number
  points: number
}

export class QuestionRoomScore {
  id: number
  questions: QuestionScore[]
}

export class QuestionScore {
  id: number
  order: number
  points: number
  description: string
  score: number
}

export class AllUserScores {
  roomId: number
  userId: number
  score: number
}