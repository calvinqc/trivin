import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = [applyMiddleware(thunk)];

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(...enhancer)
);

export default store;
