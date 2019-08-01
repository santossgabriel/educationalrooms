import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { ClientSocket } from './client-socket'

import { Reducers } from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  Reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

ClientSocket.start(store.dispatch)

sagaMiddleware.run(rootSaga)

export default store