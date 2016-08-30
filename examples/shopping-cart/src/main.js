import "babel-polyfill"

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import { runFunks } from 'redux-funk'
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  window.devToolsExtension && window.devToolsExtension()
)

runFunks(store)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
