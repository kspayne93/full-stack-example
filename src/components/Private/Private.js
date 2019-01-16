import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'; //connect is a function, not a component. This allows us to get info and update redux store state.
import { getUserData } from './../../ducks/user'; //reducer function coming from user.js (reducer file)/
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';


class Private extends Component {
   
   async componentDidMount() {
      try { // run the following. If nothing comes back, the catch statement will be run.
         const res = await axios.get('/api/user-data'); //getting the user data
         this.props.getUserData(res.data); // invoking action creator in the store, passing in logged in user's data. 
      } catch(error) { //error is the code we get
         console.log('Error: Not logged in', error)
         Swal({
            title: 'Oops...',
            text: "You aren't logged in!",
            type: 'error',
            confirmButtonText: 'Log in!'
         })
      }
   }

   balance() {
      return Math.floor( (Math.random() + 1) * 1000000 ) //Math.floor rounds DOWN to the nearest integer. Math.random gives us a random number between 0 and .9999999
   }

   async logoutSuccess() {
      await Swal({
         type: 'success',
         title: 'Woohoo!!',
         text: 'You have successfully logged out.'
      })
      this.props.history.push('/') //routes user back to home page.
   }

   render() {
      console.log(this.props) //this should show this.props.user
      const { id, email } = this.props.user; //if user is not logged in, this.props.user will be an empty object. If they're logged in, we'll have the user info
      return (
         <div>
            <h1>Account Summary</h1>
            <hr/><hr/><hr/>
            {
               id ? ( // Ternary Statement - if this is truthy (meaning if user is logged in), display account info. If not, display p tag below. 
                  <div> 
                     <p>Account Name: Kyle Payne</p>
                     <p>Account Email {email}:</p>
                     <p>Account ID: {id} </p>
                     <p>Balance: ${this.balance()}.00 </p>
                     <button onClick={() => this.logoutSuccess()} >Logout</button>
                  </div>
               ) : <p>Please log in <Link to='/'>here</Link> </p> //this gets displayed if they are not logged in.
            }
         </div>
      )
   }
}

const mapStateToProps = (reduxState) => reduxState; // getting the redux store and mapping it to this component. Information from the redux store is added to this component and can be accessed through this.props.
// all key/value pairs from redux store get added to this.props

// //can also be written like this:
// function mapStateToProps (reduxState) {
//    return reduxState
// }

export default connect(mapStateToProps, {getUserData})(Private) // connect is invoked twice. The result of invoking connect is another function (inner) which is then invoked with the second set of parentheses. javascript reads this from left to right. connect gets invoked first and takes in mapStateToProps. As soon as this state is connected, it will pass in the entire redux store state to this function. Whatever we return from this function gets added to the props object. 


//NOTES
//the second parameter that the connect function takes in is a Dispatch (mapDispatchToProps). Dispatching an action is how you update Redux state, so in this case the action being dispatched is getUserData from the user.js file(reducer file). Up above, our axios request retrieves user data from the database. Once that data comes back, the getUserData function from the store gets invoked and the user data gets passed into it, and the store state gets updated with the new information. 