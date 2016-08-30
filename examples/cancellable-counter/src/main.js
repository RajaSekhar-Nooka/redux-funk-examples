/*eslint-disable no-unused-vars*/
import "babel-polyfill"
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { runFunks } from 'redux-funk'
import reducer from './reducers'
import Counter from './components/Counter'
import loggerMiddleware from './loggerMiddleware'

const store = createStore(
  reducer,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(loggerMiddleware)
)

runFunks(store)

render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
)
