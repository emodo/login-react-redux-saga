import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';

class Home extends React.Component {
  loginOut(){
    delete localStorage.name;
    browserHistory.push('/api/login-out')
  }
  render(){
    return (
      <div className='container'>
        <h1 className='title'>Hi {localStorage.name}</h1>
        <div>
          <a className='button is-link' onClick={this.loginOut}>log out</a>
        </div>
      </div>
    )
  }
}

module.exports = Home;
