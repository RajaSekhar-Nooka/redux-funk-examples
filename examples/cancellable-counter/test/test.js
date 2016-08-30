import test from 'tape';
import {
  COUNTDOWN_TICK,
  INCREMENT,
  INCREMENT_ASYNC
} from '../src/actionTypes'
import { tick, increment } from '../src/reducers/counter'
import reducer from '../src/reducers'
const logErr = console.error.bind(console)

/*
  NOTE: the tests are way more picky and fine-grained than they
  have to be, just to show the different ways to test
*/

test('counter reducer calls funks', t => {

  test('it calls `tick`', t => {
    const state = reducer(undefined, {type: INCREMENT_ASYNC})
    t.deepEquals(state.funks[0], [tick, []])
    t.end()
  })

  test('it keeps counts down to 0, then increments counter', t => {
    let state = {
      countdown: {
        status: 'COUNTING',
        remaining: 5
      }
    }

    while (state.countdown.status === 'COUNTING') {
      const lastState = {...state}
      state = reducer(state, {type: COUNTDOWN_TICK})
      // if finished counting down
      if (lastState.countdown.remaining === 0) {
        // increment the counter
        t.deepEquals(state.funks[0], [increment, []],
          'should increment the counter')
        t.equals(state.countdown.status, 'INIT',
          'should return to initial status')
      }
      else {
        t.deepEquals(state.countdown.remaining,
          lastState.countdown.remaining - 1,
          'should decrement the seconds remaining'
        )
        // ticks again
        t.deepEquals(state.funks[0],  [tick, []],
          'should keep ticking'
        )
      }
    }
    t.end()
  })

  t.end()
})

test('counter reducer funks', t => {
  
  t.test('tick ticks', t => {
    const expected = {type: COUNTDOWN_TICK}
    tick()
      .then(action => {
        t.deepEquals(action, expected)
        t.end()
      })
      .catch(logErr)
  })

  t.test('increment increments', t => {
    const expected = {type: INCREMENT}
    increment()
      .then(action => {
        t.deepEquals(action, expected)
        t.end()
      })
      .catch(logErr)
  })

})

