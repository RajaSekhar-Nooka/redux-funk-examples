import "babel-polyfill"

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import { actionSideEffectMiddleware } from 'redux-side-effect'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'
import sagaMonitor from '../../sagaMonitor'

const sagaMiddleware = createSagaMiddleware({sagaMonitor})
const store = createStore(
  rootReducer,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(actionSideEffectMiddleware),
  applyMiddleware(sagaMiddleware)
)
// sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
