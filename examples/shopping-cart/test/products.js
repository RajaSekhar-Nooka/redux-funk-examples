import test from 'tape'
import productReducer from '../src/reducers/products'
import { getAllProducts } from '../src/reducers/products'
import { coalesceFunks } from 'redux-funk'

const reducer = coalesceFunks(productReducer)

test('products reducer calls funks', t => {
  let state = {}
  state = reducer(state, {type: 'GET_ALL_PRODUCTS'})
  t.deepEqual(
    state.funks[0],
    [getAllProducts, []],
    'calls getAllProducts'
  )
  t.end()
})

test('getAllProducts calls api.getProducts and promises an action', t => {
  const products = ['product1', 'product2']
  const mockGetProducts = () => Promise.resolve(products)
  getAllProducts(mockGetProducts).then(action => {
    t.deepEqual(action, {
      type: 'RECEIVE_PRODUCTS',
      products
    })
    t.end()
  })
})