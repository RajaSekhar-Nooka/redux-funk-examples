import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import createSagaMiddleware from 'redux-saga'
import sagaMonitor from '../../../sagaMonitor'
import { actionSideEffectMiddleware } from 'redux-side-effect'

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware({sagaMonitor})
  return {
    ...createStore(
      rootReducer,
      // applyMiddleware(sagaMiddleware),
      window.devToolsExtension && window.devToolsExtension(),
      applyMiddleware(actionSideEffectMiddleware)
      )
  }
}
