import { ActionTypes } from 'store/actions'
import { QuizStatus, SocketEvents } from 'helpers'

const INITIAL_STATE = {
  status: QuizStatus.ANSWER,
  question: {
    answers: []
  }
}

export const quizReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case ActionTypes.START_QUIZ:
      return { roomId: action.payload, status: QuizStatus.LOADING }

    case SocketEvents.Client.QUESTION_RECEIVED:
      if (state.roomId === action.payload.roomId)
        return {
          ...state,
          status: action.payload.answered ? QuizStatus.SENT : QuizStatus.ANSWER,
          question: action.payload
        }
      return state

    case SocketEvents.Client.FINISH_ROOM:
      if (state.roomId === action.payload.roomId)
        return { ...state, status: QuizStatus.ENDED, score: action.payload.score || 0 }
      return state

    case SocketEvents.Client.FEEDBACK_ANSWER:
      if (state.roomId === action.payload.roomId)
        return { ...state, status: action.payload.feedback }
      return state

    case ActionTypes.ANSWER_SENT:
      return { ...state, status: QuizStatus.SENT }

    default:
      return state
  }
}