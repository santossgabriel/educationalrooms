import { createActions, createReducer } from 'reduxsauce'

export const { Types, Creators } = createActions({
  showToastError: ['message'],
  showToastSuccess: ['message'],
  hideToast: []
})

const INITIAL_STATE = {
  message: '',
  error: false,
  show: false
}

const showToastError = (state = INITIAL_STATE, action) =>
  ({ state, message: action.payload, error: true, show: true })

const showToastSuccess = (state = INITIAL_STATE, action) =>
  ({ ...state, message: action.payload, error: false, show: true })

const hideToast = (state = INITIAL_STATE) => ({ ...state, show: false })

export default createReducer(INITIAL_STATE, {
  [Types.SHOW_TOAST_ERROR]: showToastError,
  [Types.SHOW_TOAST_SUCCESS]: showToastSuccess,
  [Types.HIDE_TOAST]: hideToast
})