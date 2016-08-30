import test from 'tape'
import reducer, { getPosts } from '../src/reducers'
import * as actions from '../src/actions'

test('reducer called with REQUEST_POSTS', t => {
  const redditName = 'react_reddit'
  const action = actions.requestPosts(redditName)
  const state = reducer(undefined, action)
  t.deepEqual(
    state.funks[0],
    [getPosts, [redditName]],
    'should request posts'
  )
  t.end()
})

test('funk helpers—getPosts', t => {
  const reddit = 'reactjs'
  const mockPosts = [1, 2, 3]
  let calledWith
  const apiSpy = function(reddit){
    calledWith = reddit
    return Promise.resolve(mockPosts)
  }
  t.plan(4)
  getPosts(reddit, apiSpy).then(action => {
    t.deepEqual(calledWith, reddit, 'api.getPosts called with reddit')
    const expected = actions.receivePosts(reddit, mockPosts)
    t.equal(action.type, expected.type, 'promises action with correct type')
    t.deepEqual(action.posts, expected.posts, 'promises action with correct posts')
    t.deepEqual(action.reddit, expected.reddit, 'promises action with correct reddit')
  })
})