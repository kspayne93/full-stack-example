const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get('db');
    const accountArr = await db.find_acc_email({ email: email })
    if (accountArr.length >= 1) {
      return res.status(200).send({ message: 'Email already in use.' })
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    let newAccArr = await db.create_acc({ email: email, hash: hash })
    req.session.user = { id: newAccArr[0].acc_id, email: newAccArr[0].acc_email }
    res.status(200).send({ message: 'logged in', userData: req.session.user, loggedIn: true })
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get('db');
    const accountArr = await db.find_acc_email({ email: email });
    if (!accountArr[0]) {
      return res.status(200).send({ message: 'Email not found.' });
    }
    const result = bcrypt.compareSync(password, accountArr[0].acc_hash)
    if (!result) {
      return res.status(401).send({ message: 'Password incorrect.' })
    }
    req.session.user = { id: accountArr[0].acc_id, email: accountArr[0].acc_email }
    res.status(200).send({ message: 'logged in', userData: req.session.user, loggedIn: true })
  },
  userData: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.status(401).send('Please log in.');
    }
  }
}