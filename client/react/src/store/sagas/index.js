import { delay, takeEvery } from 'redux-saga/effects'
import { Types } from 'store/ducks/toast'
import Store from 'store'
import { SAGA_SHOW_TOAST_ERROR, SAGA_SHOW_TOAST_SUCCESS } from './actions'

function* showToastError(action) {
  Store.dispatch({ type: Types.SHOW_TOAST_ERROR, payload: action.payload })
  yield delay(2000)
  Store.dispatch({ type: Types.HIDE_TOAST })
}

function* showToastSuccess(action) {
  Store.dispatch({ type: Types.SHOW_TOAST_SUCCESS, payload: action.payload })
  yield delay(2000)
  Store.dispatch({ type: Types.HIDE_TOAST })
}

export default function* rootSaga() {
  yield takeEvery(SAGA_SHOW_TOAST_ERROR, showToastError)
  yield takeEvery(SAGA_SHOW_TOAST_SUCCESS, showToastSuccess)
}