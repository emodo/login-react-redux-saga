import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import loginApp from './reducers';
import root from './sagas';
import Main from './main';
require('../stylesheets/bulma.css');
require('../stylesheets/style.css');


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    loginApp,
    routing: routerReducer,
  }),
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

sagaMiddleware.run(root, store.getState);

const history = syncHistoryWithStore(browserHistory, store);
const appProps = {
  history,
  store,
};

render((
  <Main { ...appProps } />
), document.getElementById('root'));
