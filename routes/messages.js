const express = require('express');
const router = express.Router();
const messageFunctions = require('../db/message-queries');

router.use((req, res, next) => {
  if (!req.session["user_id"]) {
    res.redirect('/login');
  }

  next();
});

router.get('/', (req, res) => {
  messageFunctions.getMessages()
    .then((messages) => {
      res.json(messages);
    });
});

module.exports = router;
