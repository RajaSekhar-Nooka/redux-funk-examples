import test from 'tape'
import { checkoutSuccess } from '../src/actions'
import cartReducer from '../src/reducers/cart'
import { checkout } from '../src/reducers/cart'
import { coalesceFunks } from 'redux-funk'

const reducer = coalesceFunks(cartReducer)
const quantityById = {foo: 1}

test('cart reducer calls funks', t => {
  let state = {quantityById}
  state = reducer(state, {type: 'CHECKOUT_REQUEST'})
  t.deepEqual(
    state.funks[0],
    [checkout, [quantityById]],
    'calls checkout with the current quantity by ID'
  )
  t.end()
})

test('checkout calls api.checkout', t => {
  const quantityById = {'product1': 1, 'product2': 2}
  let called

  /* eslint-disable no-unused-vars */
  const mockBuyProducts = (quantityById, buyProducts) => {
    /* eslint-enable no-unused-vars */
    called = quantityById
    return Promise.resolve(checkoutSuccess())
  }
  
  checkout(quantityById, mockBuyProducts).then(action => {
    t.equal(called, quantityById)
    t.deepEqual(action, checkoutSuccess())
    t.end()
  })
})