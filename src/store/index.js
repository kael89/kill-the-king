import '@babel/polyfill';

import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { pieceChangeMiddleware } from './modules/board';
import rootReducer from './rootReducer';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(pieceChangeMiddleware, thunkMiddleware)),
);
