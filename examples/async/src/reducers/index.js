import { combineReducers } from 'redux'
import {
  STARTUP,
  SELECT_REDDIT,
  INVALIDATE_REDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions'

import {
  fetchPosts
} from "../side-effects"

import {
  selectedRedditSelector
} from './selectors'


function posts(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return { ...state, isFetching: true }

    case RECEIVE_POSTS:
      return { ...state,
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

function rootReducer(state = {selectedReddit: 'reactjs', postsByReddit: {} }, action) {
  switch (action.type) {
    case STARTUP:
      action.sideEffect(fetchPosts(state.selectedReddit))
      return state
    case SELECT_REDDIT:
      const isCached = state.postsByReddit[action.reddit]
      if (!isCached) {
        action.sideEffect(fetchPosts(action.reddit))
      }
      return { ...state, selectedReddit: action.reddit}
    case INVALIDATE_REDDIT:
      action.sideEffect(fetchPosts(action.reddit))
      return state
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return { ...state,
        postsByReddit: {
          [action.reddit]: posts(state[action.reddit], action)
        }
      }
    default:
      return state
  }
}

export default rootReducer
