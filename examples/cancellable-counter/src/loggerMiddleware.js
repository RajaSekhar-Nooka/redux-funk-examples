import {
  COUNTDOWN_TICK,
  COUNTDOWN_TERMINATED,
  CANCEL_INCREMENT_ASYNC
} from './actionTypes'

// not really necessary, since we're using Redux dev tools
const loggerMiddleware = store => next => action => {
  const message = action.type && {
    [COUNTDOWN_TICK]: 'countdown',
    [COUNTDOWN_TERMINATED]: 'countdown terminated',
    [CANCEL_INCREMENT_ASYNC]: 'countdown cancelled'
  }[action.type]
  if (message) {
    const stateStr = JSON.stringify(store.getState(), 2)
    console.log(message, stateStr)
  }
  return next(action)
}

export default loggerMiddleware
