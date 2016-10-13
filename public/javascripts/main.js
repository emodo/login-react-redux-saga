import React from 'react';
import { render } from 'react-dom';
import {IndexRoute, Router, Route, Link, browserHistory } from 'react-router';
import Login from './components/login';
import Home from './components/home';
import Reg from './components/reg';
import NoMatch from './components/NoMatch';
import { Provider } from 'react-redux';
import requireAuth from './utils';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {  syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import loginApp from './reducers';
import root from './sagas';

require('../stylesheets/bulma.css');
require('../stylesheets/style.css');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  onGetInfo(data){
    if (data) {
      this.setState({
        name: data
      })
    }
    return this.state.name;
  }

  render(){
    return (
      <div className='container'>
      {this.props.children && React.cloneElement(this.props.children, {
           onGetInfo: this.onGetInfo.bind(this)
         })}
      </div>
    )
  }
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    loginApp,
    routing: routerReducer
  }),
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )

)

sagaMiddleware.run(root, store.getState);

const history = syncHistoryWithStore(browserHistory, store)

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="home" onEnter={requireAuth} component={Home}/>
        <Route path="reg" component={Reg}/>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
