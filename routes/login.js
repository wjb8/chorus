const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/');
});

router.get('/:id', (req, res) => {
  if (req.params.id === 'logout') {
    res.clearCookie('session');
    return res.redirect('/');
  }
  req.session['user_id'] = req.params.id;
  res.redirect('/');
});

module.exports = router;
