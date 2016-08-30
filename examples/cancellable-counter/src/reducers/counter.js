import {
  INCREMENT,
  DECREMENT,
  INCREMENT_IF_ODD,
  INCREMENT_ASYNC,
  CANCEL_INCREMENT_ASYNC,
  COUNTDOWN_TERMINATED,
  COUNTDOWN_TICK
} from '../actionTypes'
import { call } from 'redux-funk'
import { createMachine } from 'redux-machine'

const COUNTDOWN_SECONDS = 5

// exporting these for testing
export const tick = () => new Promise(resolve => {
  setTimeout(() => resolve({type: COUNTDOWN_TICK}), 1000)
})
export const increment = () => Promise.resolve({type: INCREMENT})

export const countdownCounting = (state = {remaining: 0}, action) => {
  switch (action.type) {
    case COUNTDOWN_TICK:
      if (state.remaining === 0) {
        call(action, [increment, []])
        return {...state,   'status': 'INIT'}
      }
      call(action, [tick, []])
      
      return {...state, remaining: state.remaining - 1}
    case COUNTDOWN_TERMINATED:
      return {...state, 'status': 'INIT'}
    case CANCEL_INCREMENT_ASYNC:
      return {...state, 'status': 'INIT'}
    default:
      return state
  }
}

const countdownInit = (state = {remaining: 0}, action) => {
  switch (action.type) {
  case INCREMENT_ASYNC:
    call(action, [tick, []])
    return {...state, remaining: COUNTDOWN_SECONDS, 'status': 'COUNTING'}
  default:
    return state
  }
}

export const countdown = createMachine({
  'INIT': countdownInit,
  'COUNTING': countdownCounting
})


export const counter = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    case INCREMENT_IF_ODD:
      return state % 2 ? state + 1 : state
    default:
      return state
  }
}
