import { combineReducers } from 'redux'
import { call, coalesceFunks } from 'redux-funk'

const DELAY = process && process.env.NODE_ENV === 'testing'
                                                ? 0
                                                : 1000

// exporting for testing
export const incrementAsync = () => new Promise(resolve => {
  setTimeout(() => resolve({type: 'INCREMENT'}), DELAY)
})

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_ASYNC':
      call(action, [incrementAsync, []])
      return state
    case 'INCREMENT':
      return state + 1
    case 'INCREMENT_IF_ODD':
      return (state % 2 !== 0) ? state + 1 : state
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const rootReducer = coalesceFunks(combineReducers({
  counter,
  funks: () => []
}))

export default rootReducer