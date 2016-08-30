/**
 * Mocking client-server processing
 */
import _products from './products'

const TIMEOUT = 100
const MAX_CHECKOUT = 2 // max different items

export const api = {
  getProducts() {
    return new Promise( resolve => {
      setTimeout(() => resolve(_products), TIMEOUT)
    })
  },

  buyProducts(quantityById) {
    return new Promise( (resolve, reject) =>
        setTimeout(() => {
          if(Object.keys(quantityById).length <= MAX_CHECKOUT)
            resolve()
          else
            reject(`You can buy ${MAX_CHECKOUT} items at maximum in a checkout`)
        }, TIMEOUT)
    )
  }
}
