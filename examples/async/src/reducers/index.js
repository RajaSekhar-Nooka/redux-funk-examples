import { combineReducers } from 'redux'
import { coalesceFunks, call } from 'redux-funk'
import {
  SELECT_REDDIT,
  REQUEST_POSTS,
  receivePosts,
  RECEIVE_POSTS
} from '../actions'
import * as api from '../services/postsApi'
const errHandler = err => {
  console.error(err)
  return {type: "ERR", payload: err}
}


export const getPosts = (reddit, fetchPosts=api.fetchPosts) => {
  return fetchPosts(reddit)
    .then(posts => {
        return receivePosts(reddit, posts)
    })
    .catch(errHandler)
}

function selectedReddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

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

function postsByReddit(state = { }, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      call(action, [getPosts, [action.reddit]])
    case RECEIVE_POSTS:
      return { ...state,
        [action.reddit]: posts(state[action.reddit], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit,
  funks: () => true
})

export default coalesceFunks(rootReducer)
