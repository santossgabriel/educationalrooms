import { appReducer } from './app.reducer'
import { modalReducer } from './modal.reducer'
import { quizReducer } from './quiz.reducer'
import { combineReducers } from 'redux'

export const Reducers = combineReducers({
  appState: appReducer,
  modalState: modalReducer,
  quizState: quizReducer
})