/*eslint-disable no-unused-vars*/
import "babel-polyfill"

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { actionSideEffectMiddleware } from 'redux-side-effect'
import createSagaMiddleware from 'redux-saga'
import sagaMonitor from '../../sagaMonitor'

import reducer from './reducers'
import rootSaga from './sagas'
import Counter from './components/Counter'


const sagaMiddleware = createSagaMiddleware({sagaMonitor})
const store = createStore(
  reducer,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(actionSideEffectMiddleware),
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
)
