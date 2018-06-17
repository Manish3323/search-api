import promise from 'redux-promise'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import './Styles/App.css';
import reducer from './Reducers'


const middleware = []
middleware.push(promise)
middleware.push(thunk)
export const configureStore = (initialState) => {
    const enhancer = compose(
        applyMiddleware(...middleware)
    )
    const store = createStore(
        reducer,
        initialState,
        enhancer
        )
  return store
}