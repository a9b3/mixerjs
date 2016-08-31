import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './root-reducer.js'

export default function() {
  const middlewares = [
    thunkMiddleware,
    CONFIG.debug && createLogger(),
  ]
  .filter(a => a)

  return compose(
    applyMiddleware(...middlewares),
  )(createStore)(rootReducer)
}
