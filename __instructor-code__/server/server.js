require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./authCtrl');

const { SERVER_PORT, SECRET, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false
}))

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
  })
})

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/api/user-data', authCtrl.userData)
app.get('/auth/logout', (req, res) => {
  req.session.destroy();
  res.redirect('http://localhost:3000/#/')
})

