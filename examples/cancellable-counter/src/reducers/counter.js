import {
  INCREMENT,
  DECREMENT,
  INCREMENT_IF_ODD,
  INCREMENT_ASYNC,
  CANCEL_INCREMENT_ASYNC,
  COUNTDOWN_TERMINATED,
  COUNTDOWN_TICK
} from '../actionTypes'

import {
  startCountdown
} from '../side-effects'

const COUNTDOWN_SECONDS = 5

const tick = dispatch => setTimeout(() => dispatch({type: COUNTDOWN_TICK}), 1000)
// not really necessary, since we're using Redux dev tools
// but wanted to show how to do this
const log = message => dispatch => console.log(message)

export function countdown(state = 0, action) {
  switch (action.type) {
    case INCREMENT_ASYNC:
      action.sideEffect(tick)
      return COUNTDOWN_SECONDS
    case COUNTDOWN_TICK:
      if (state === 0) {
        return state
      }
      action.sideEffect(log('countdown', state))
      action.sideEffect(tick)
      return state - 1
    case COUNTDOWN_TERMINATED:
      action.sideEffect(log('countdown terminated', state))
    case CANCEL_INCREMENT_ASYNC:
      action.sideEffect(log('countdown cancelled'))
      return 0
    default:
      return state
  }
}



export function counter(state = 0, action) {
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
