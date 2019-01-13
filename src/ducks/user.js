//This is the reducer file

const initialState = {
   user: {} //user data is being kept in the Redux store's state. Initially set to an empty object.
}

// ACTION TYPES
const GET_USER_DATA = 'GET_USER_DATA'


//ACTION CREATORS
export function getUserData(userInfo) { //res.data (the data that came back from our axios request in Private.js) is getting passed in as userInfo
   return {
      type: GET_USER_DATA,
      payload: userInfo
   }
}

//REDUCER
export default function reducer(state = initialState, action) { //reducer function takes in state and an action as parameters. if state is ever undefined, the value of state will be set to initial state (as defined above in const initialState). When redux initially boots up, it passes in nothing for state. This would result in undefined and break our code. That's why by default, we pass in initial state so that the first time redux starts up, state has a value.
   switch(action.type) { //switch is basically an if/else statement. 
      case GET_USER_DATA:
         return { ...state, user: action.payload  } //spread operator (...state) copies everything that was on state before to the new copy of state. the second parameter overwrites key value pair on the new copy of state, or inserts it if it wasn't there before. 
         //same as return Object.assign( {}, state, {user: action.payload});
         
      default:
         return state; //if no cases get invoked, the default action is just to return the store's state.
   }
}


//NOTES
// An action has a description of how to update state (actionType, payload).
// Anytime we are getting information from the store, we are Subscribing to the store.