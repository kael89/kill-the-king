import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { pieceChangeMiddleware } from './middleware';
import reducers from './reducers';

const rootReducer = combineReducers(reducers);

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(pieceChangeMiddleware, thunkMiddleware)),
);
