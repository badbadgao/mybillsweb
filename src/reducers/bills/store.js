import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducer';
import logger from 'redux-logger'
import thunk from 'redux-thunk';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  appReducer,
  applyMiddleware(thunk, logger)
);

export default store;
