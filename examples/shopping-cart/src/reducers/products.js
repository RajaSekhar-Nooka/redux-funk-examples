import { combineReducers } from 'redux'
import { call } from 'redux-funk'
import {
  GET_ALL_PRODUCTS,
  receiveProducts,
  RECEIVE_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART
} from '../actions'

import { api } from '../services'

// export for testing
export const getAllProducts = (getProducts=api.getProducts) => {
  return getProducts()
          .then(receiveProducts)
}

function products(state = {inventory: 3}, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return state
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1
      }
      case REMOVE_FROM_CART:
        return {
          ...state,
          inventory: state.inventory + 1
        }
    default:
      return state
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      call(action, [getAllProducts, []])
      return state
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {})
      }
    default:
      const { productId } = action
      if (productId) {
        return {
          ...state,
          [productId]: products(state[productId], action)
        }
      }
      return state
  }
}

function visibleIds(state = [], action) {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product.id)
    default:
      return state
  }
}

export default combineReducers({
  byId,
  visibleIds,
  products
})

export function getProduct(state, id) {
  return state.byId[id]
}

export function getVisibleProducts(state) {
  return state.visibleIds.map(id => getProduct(state, id))
}
