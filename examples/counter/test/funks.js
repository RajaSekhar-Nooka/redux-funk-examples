import test from 'tape';
import reducer from '../src/reducers'
import { incrementAsync } from '../src/reducers'

test('counter reducer called with INCREMENT_ASYNC', t => {
  const state = reducer(undefined, {type: 'INCREMENT_ASYNC'})
  t.deepEqual(
        state.funks[0],
        [incrementAsync, []],
        'calls incrementAsync'
  )
  t.end()
})

test('funk helpers—incrementAsync', t => {
  const expectedAction = {type: 'INCREMENT'}
  incrementAsync().then(action => {
    t.deepEqual(action, expectedAction)
    t.end()
  })
})
