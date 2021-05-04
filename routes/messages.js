const { Template } = require('ejs');
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
  const currentUser = req.session["user_id"];
  messageFunctions.getMessagesWithUser(currentUser)
    .then((messages) => {
      const templateVars = { messages, currentUser };
      console.log(messages);
      res.render('messages', templateVars);
    });
});

module.exports = router;
