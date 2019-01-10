import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserData } from './../../ducks/user';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

class Private extends Component {
  async componentDidMount() {
    try {
      const res = await axios.get('/api/user-data');
      // invoke action creator, passing in logged in user's data
      this.props.getUserData(res.data);
    } catch (e) {
      console.log('Error: not logged in', e)
      Swal({
        title: 'Oops...',
        text: "You aren't logge din!",
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login!'
      }).then((result) => {
        console.log(result)
        if (result.value) {
          this.props.history.push('/')
        }
      })
    }
  }

  balance() {
    return Math.floor((Math.random() + 100) * 1000)
  }

  render() {
    console.log(this.props)
    const { id, email } = this.props.user;
    return (
      <div>
        <h1>Account Summary</h1>
        <hr /><hr /><hr />
        {
          id ? (
            <div>
              <p>Account Name: Joe Blank</p>
              <p>Account Email: {email}</p>
              <p>Account ID: {id}</p>
              <p>Balance: ${this.balance()}.00</p>
              <a href='http://localhost:4000/auth/logout'>
                <button>Logout</button>
              </a>
            </div>
          ) : <p>Please log in. <Link to='/'>homepage</Link></p>
        }
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState;
// return redux state from mapState
// all key/value pairs from redux store get added to this.props
// const decorator = connect(mapState)
// export default decorator(Private)
export default connect(mapState, { getUserData })(Private);