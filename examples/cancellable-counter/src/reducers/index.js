import { coalesceFunks } from 'redux-funk'
import { combineReducers } from 'redux'
import { counter, countdown } from './counter'

const rootReducer = coalesceFunks(combineReducers({
  countdown,
  counter,
  funks: () => []
}))

export default rootReducer
