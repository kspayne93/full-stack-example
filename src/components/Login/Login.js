import React, { Component } from 'react';
import logo from './communityBank.svg';
import axios from 'axios';
import './Login.css';
import Swal from 'sweetalert2';

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
      if (res.data.loggedIn) { //res.data.loggedIn is a truthy or falsy. If it's true, then the user is logged in. 
         this.props.history.push('/private') //this sends the user to the private route
      }
   }

   async login() {
      const { email, password } = this.state;
      const res = await axios.post('/auth/login', { email: email, password: password })
      if (res.data.loggedIn) {
          await Swal({ //await will make it so that the alert will pop up first before routing to the /private page
            type: 'success',
            title: 'Nice!',
            text: 'You have successfully logged in.'
          })
         this.props.history.push('/private') //this sends the user to the private route
      }
   }

  render() {
    return (
      <div>
        <img src={logo} alt="" />
        <p>
           <span>Email:</span>
           <input onChange={(e) => this.setState({ email: e.target.value })} type="text"/>
        </p>
        <p>
           <span>Password:</span>
           <input onChange={(e) => this.setState({ password: e.target.value })} type="text"/>
        </p>
        <button onClick={() => this.register()} >Register</button>
        <button onClick={() => this.login()} >Login</button>
      </div>
    )
  }
}