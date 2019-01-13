const bcrypt = require('bcryptjs');

module.exports = {
   register: async (req, res) => {
      const { email, password } = req.body; //destructuring off of incoming body
      const db = req.app.get('db'); //getting the database connection off of app ('db' is the key that is assigned to the db connection)
      const accountArr = await db.find_acc_email({ email: email }) //fetching user info (found with email) and setting the value to accountArr variable.
      if (accountArr.length >=1) { //if accountArr returns a row (if user is already in database)
         return res.status(200).send({message: 'Email already in use.'})
      }
      const salt = bcrypt.genSaltSync(10); // salting password (making it more complex and secure). genSaltSync is asynchronous version of genSalt.
      const hash = bcrypt.hashSync(password, salt) //hash must come after salt. Hash will take in the password and salt as parameters, then hash them.
      let newAccArr = await db.create_acc({ email: email, hash: hash }); //creating account. sending email and hash to create_acc.sql to be inserted into db table.
      req.session.user = {id: newAccArr[0].acc_id, email: newAccArr[0].acc_email} //adding user info/credentials to session with id and email.
      res.status(200).send({ message: 'logged in', userData: req.session.user, loggedIn: true }) //sending back ok status and user's session info.
   },

   login: async (req, res) => {
      const { email, password } = req.body;
      const db = req.app.get('db');
      const accountArr = await db.find_acc_email({ email:email });
      if(!accountArr[0]) { //if accountArr at position 0 doesn't exist, meaning user is not found. The database sends back an array containing a single object, so position [0] means the array has an object (therefore, a user was found).
         return res.status(200).send({message: 'Email not found.'});
      }
      const result = bcrypt.compareSync(password, accountArr[0].acc_hash) //taking in plain text password from req.body and comparing it to the info from the hash. (does the incoming password match up with hash value in database). Results in boolean (truthy or falsy).
      if(!result) { //if result is false, meaning passwords don't match up
         return res.status(401).send({message: 'Password incorrect.'})
      }
      req.session.user = {id: accountArr[0].acc_id, email: accountArr[0].acc_email} //adding user info onto session
      res.status(200).send({ message: 'logged in', userData: req.session.user, loggedIn: true }) 
   },

   userData: (req, res) => {
      if(req.session.user) {
         res.status(200).send(req.session.user)
      } else {
         res.status(401).send('Please log in.');
      }
   } 
}


//NOTES:
//if someone is logged in, there will be a user property on req.session