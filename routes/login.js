//Dummy login used for demo purposes. Use /login/# to login as that user or /login/logout to clear the cookie

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/listings');
});

router.get('/:id', (req, res) => {
  if (req.params.id === 'logout') {
    res.clearCookie('session');
    return res.redirect('/listings');
  }
  req.session['user_id'] = req.params.id;
  res.redirect('/listings');
});

module.exports = router;
