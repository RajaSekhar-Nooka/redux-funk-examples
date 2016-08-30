import { call } from 'redux-funk'
import { createMachine } from 'redux-machine'
import { api } from '../services'
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT_REQUEST,
  checkoutSuccess,
  CHECKOUT_SUCCESS,
  checkoutFailure,
  CHECKOUT_FAILURE
} from '../actions'

  // exported for testing
  export const checkout = (quantityById, buyProducts=api.buyProducts) => {
    return buyProducts(quantityById)
      .then(checkoutSuccess)
      .catch(checkoutFailure)
  }

  function quantityByIdReducer(state, action) {
  const { productId } = action
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        [productId]: (state[productId] || 0) + 1
      }
    case REMOVE_FROM_CART:
      const qty = (state[productId] || 0) - 1
      const copy = {...state}
      if(qty > 0)
        copy[productId] = qty
      else
        delete copy[productId]
      return copy
    default:
      return state
  }
}

const pendingReducer = (state, action) => {
  switch(action.type) {
    case CHECKOUT_SUCCESS:
      return {...state, status: 'INIT', quantityById: {}}
    case CHECKOUT_FAILURE:
      return {...state, status: 'INIT', error: action.error}
  }
}

const initReducer = (state = {err: null, quantityById: {}}, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      call(action, [checkout, [state.quantityById]])
      return {...state, status: 'PENDING'}
    default:
      const quantityById = quantityByIdReducer(state.quantityById, action)
      return {...state, quantityById}
  }
}

const cart = createMachine({
  'INIT': initReducer,
  'PENDING': pendingReducer
})

export default cart

export function getQuantity(state, productId) {
  return state.quantityById[productId] || 0
}

export function getAddedIds(state) {
  return Object.keys(state.quantityById)
}
