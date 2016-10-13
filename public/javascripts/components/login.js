import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      error: '',
    };
  }

  login(){
    const { dispatch } = this.props;
    dispatch({
      type: 'LOG_IN',
      name: this.state.name,
      password:  this.state.password,
    })
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.loginApp.error) {
      this.setState({
        error: nextProps.loginApp.message,
      })
    }
  }

  render (){
    const login = this.login.bind(this);
    const name = {
      value : this.state.name,
      onChange: (e) => {
        this.setState({
          name: e.target.value,
        })
      }
    }
    const password = {
      value : this.state.password,
      onChange: (e) => {
        this.setState({
          password: e.target.value,
        })
      }
    }
    return(
      <div>
        <h1 className='title'>login</h1>
        <div className='control'>
          <label className='label'>name</label>
          <input {...name} className='input' id='name'/>
        </div>
        <div className='control'>
          <label className='label'>password</label>
          <input
            { ...password}
            className='input'
            type='password'
            id='password' />
        </div>
        <div className='control help is-danger'>{this.state.error}</div>
        <div className='control'>
          <a className='button' id='login' onClick={login}>login</a>
          <a className='button is-link' href='/reg'>don't have account?</a>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loginApp: state.loginApp,
});

module.exports = connect(mapStateToProps)(Login);
