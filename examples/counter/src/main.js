/*eslint-disable no-unused-vars*/
import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { runFunks } from 'redux-funk'
import Counter from './components/Counter'
import reducer from './reducers'


const store = createStore(
  reducer,
  window.devToolsExtension && window.devToolsExtension(),
)

store.subscribe(() => {
  console.log(store.getState())
})

runFunks(store)

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState().counter}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementIfOdd={() => action('INCREMENT_IF_ODD')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
