import React, { Component } from 'react';
import logo from './communityBank.svg';
import axios from 'axios';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  async register() {
    const { email, password } = this.state;
    const res = await axios.post('/auth/register', { email: email, password: password })
    if (res.data.loggedIn) {
      this.props.history.push('/private')
    }
  }

  async login() {
    const { email, password } = this.state;
    const res = await axios.post('/auth/login', { email: email, password: password })
    if (res.data.loggedIn) {
      this.props.history.push('/private')
    }
  }

  render() {
    return (
      <div>
        <img src={logo} alt="" />
        <p>
          <span>Email:</span>
          <input onChange={(e) => this.setState({ email: e.target.value })} type="text" />
        </p>
        <p>
          <span>Password:</span>
          <input onChange={(e) => this.setState({ password: e.target.value })} type="text" />
        </p>
        <button onClick={() => this.register()}>Register</button>
        <button onClick={() => this.login()}>Login</button>
      </div>
    )
  }
}

