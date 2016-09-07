import fetch from 'isomorphic-fetch'
import * as actions from '../actions'

const fetchPostsApi = (reddit) => {
    return fetch(`http://www.reddit.com/r/${reddit}.json` )
            .then(response => response.json() )
            .then(json => json.data.children.map(child => child.data) )
}

export const fetchPosts = reddit => dispatch => {
  dispatch(actions.requestPosts(reddit))
  fetchPostsApi(reddit).then(posts => {
    dispatch(actions.receivePosts(reddit, posts))
  })
}