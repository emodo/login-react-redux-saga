import React, { PropTypes } from 'react';
import { IndexRoute, Router, Route } from 'react-router';
import App from './app';
import Login from './components/login';
import Home from './components/home';
import Reg from './components/reg';
import NoMatch from './components/NoMatch';
import { Provider } from 'react-redux';
import requireAuth from './utils';

function Main(props) {
  return (
    <Provider store={props.store}>
      <Router history={props.history}>
        <Route path="/" component={App}>
          <IndexRoute component={Login} />
          <Route path="home" onEnter={requireAuth} component={Home} />
          <Route path="reg" component={Reg} />
          <Route path="*" component={NoMatch} />
        </Route>
      </Router>
    </Provider>
  );
}

Main.propTypes = {
  history: PropTypes.any,
  store: PropTypes.any,
};

module.exports = Main;
