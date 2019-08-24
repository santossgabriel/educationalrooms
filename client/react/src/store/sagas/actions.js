export const SAGA_SHOW_TOAST_ERROR = 'SAGA_SHOW_TOAST_ERROR'
export const SAGA_SHOW_TOAST_SUCCESS = 'SAGA_SHOW_TOAST_SUCCESS'

export const showToastSuccess = message => ({
  type: SAGA_SHOW_TOAST_SUCCESS,
  payload: message
})

export const showToastError = message => ({
  type: SAGA_SHOW_TOAST_ERROR,
  payload: message
})