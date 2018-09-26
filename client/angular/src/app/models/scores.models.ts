export class Scores {
  roomsScores: RoomScore[]
  allUserScores: AllUserScores[]
  myRoomsScores: MyRoomScore[]
}

export class RoomScore {
  roomId: number
  score: number
  points: number
}

export class AllUserScores {
  roomId: number
  userId: number
  score: number
}

export class MyRoomScore {
  id: number
  name: string
  questions: QuestionScore[]
  users: UserScore[]
}

export class UserScore {
  id: number
  score: number
  name: string
  picture: string
  questions: QuestionScore[]
}

export class QuestionScore {
  id: number
  order: number
  points: number
  description: string
  score: number
}