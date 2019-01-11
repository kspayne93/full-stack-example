require('dotenv').config();
const express = require('express');
const session = require('express-session')
const massive = require('massive');
const authCtrl = require('./authCtrl');

const { SERVER_PORT, SECRET, CONNECTION_STRING } = process.env;

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(session({
   secret: SECRET,
   resave: false,
   saveUninitialized: false
}));

massive(CONNECTION_STRING).then(db => {
   app.set('db', db);  //app.set is a method that sets values to an object on app. We're setting the db value to a key called 'db' on app. 
      console.log('Connected to database')
   app.listen(SERVER_PORT, () => { 
      console.log(`Listening on port: ${SERVER_PORT}`) //putting the listen method in the .then ensures that the server won't watch for changes or update until after the database is connected
   })
 })


//ENDPOINTS
app.post('/auth/register', authCtrl.register) //register
app.post('/auth/login', authCtrl.login) //login
app.get('/api/user-data', authCtrl.userData) //show user data
app.get('/auth/logout', (req,res) => { //logout
   req.session.destroy();
   res.redirect('http://localhost:3000/#/')
})


//app.use(express.static( `${_dirname}/../build` ) )