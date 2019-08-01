import { call, all, delay, take, put, select, takeEvery } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { QuizStatus } from 'helpers/constants'
import openSocket from 'socket.io-client'
import { ActionTypes } from 'store/actions'

import { storageService } from 'services'

// const token = storageService.getToken()
// const socket = openSocket({ query: `token=${token}` })

// socket.on('connect', () => {
//   socket.on('onError', message => console.error('Erro Socket', message))
//   console.log('me conectei!')
// })

// socket.on('disconnect', () => {
//   console.log('fui disconectado!')
// })

// function* createEventChannel(mySocket) {
//   return eventChannel(emit => {
//     mySocket.onmessage((message) => emit(message.data));
//     return () => {
//       mySocket.close();
//     };
//   });
// }
// function* initializeWebSocketsChannel() {
//   const mySocket = new WebSocket("ws://www.xyz.com/socketServer", "protocol");
//   const channel = yield call(createEventChannel, mySocket);
//   while (true) {
//     const { message } = yield take(channel);
//     yield put({ type: WEBSOCKET_MESSAGE_RECEIVED, message });
//   }
// }
// export function* mySaga() {
//   yield [
//     takeEvery('INITIALIZE_WEB_SOCKETS_CHANNEL', initializeWebSocketsChannel)
//   ];
// }




function* counter1() {
  // let i = 0
  // while (true) {
  //   // yield takeEvery('teste', testeInit)
  //   yield put({ type: 'counter1', payload: null })
  // }
}

function* counter2() {
  let i = 0
  while (true) {
    yield delay(1000)
    // console.clear()
    console.log('counter2 ' + i++)
    yield put({ type: 'teste', payload: { status: QuizStatus.WRONG } })
  }
}

export default function* rootSaga() {
  // yield all([counter1(), counter2(), testeInit()])
  // while (true) {
  //   yield delay(1000)
  //   console.clear()
  //   console.log(i++)
  //   yield put({ type: 'teste', payload: { status: QuizStatus.WRONG } })
  // }
  // console.log('root saga')

  // while (true) {
  //   const action = yield take(ActionTypes.QUIZ_SEND_ANSWER)
  //   const quizState = select(state => state.quizState)
  //   // console.log('action - ' + ActionTypes.QUIZ_SEND_ANSWER, action)
  //   // console.log('state - ' + ActionTypes.QUIZ_SEND_ANSWER, quizState)

  //   yield put({ type: ActionTypes.QUIZ_STATUS_CHANGED, payload: { status: QuizStatus.WRONG } })
  //   yield delay(2000)

  //   yield put({ type: ActionTypes.QUIZ_STATUS_CHANGED, payload: { question: { answers: [] }, status: QuizStatus.ANSWER } })
  //   yield delay(2000)
  // }

  // while (true) {
  //   const p = yield take(ActionTypes.QUIZ_SEND_ANSWER)
  //   yield put({ type: 'MENSAGEM', payload: { status: QuizStatus.WRONG } })
  // }

  // yield [
  //   takeEvery(ActionTypes.QUIZ_SEND_ANSWER, initializeSocket)
  // ]
}