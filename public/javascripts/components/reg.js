import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { checkStatus, parseJSON } from '../utils';

class Reg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      error: '',
    };
  }

  reg(){
    const { dispatch } = this.props;
    dispatch({
      type: 'REG',
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

  render(){
    const reg = this.reg.bind(this);
    const name = {
      value : this.state.name,
      onChange: (e) => {
        this.setState({
          name: e.target.value,
        })
      },
    };

    const password = {
      value : this.state.password,
      onChange: (e) => {
        this.setState({
          password: e.target.value,
        })
      },
    };

    return (
      <div className='container'>
        <h1 className='title'>reg</h1>
        <div className='control'>
          <label className='label'>name</label>
          <input {...name} className='input' />
        </div>
        <div className='control'>
          <label className='label'>password</label>
          <input {...password} className='input' type='password' />
        </div>
        <div className='control help is-danger'>{this.state.error}</div>
        <div className='control'>
          <a className='button' onClick={reg}>submit</a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loginApp: state.loginApp,
});

module.exports = connect(mapStateToProps)(Reg);
