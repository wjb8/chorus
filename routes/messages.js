const express = require('express');
const router = express.Router();
const messageFunctions = require('../db/message-queries');
const listingFunctions = require('../db/listing-queries');

router.use((req, res, next) => {
  if (!req.session["user_id"]) {
    res.redirect('/login');
  }

  next();
});

router.get('/', (req, res) => {
  const currentUser = req.session["user_id"];
  messageFunctions.getMessagesToUser(currentUser)
    .then((messages) => {
      const templateVars = { messages, currentUser };
      res.render('messages', templateVars);
    });
});

router.post('/', (req, res) => {
  const currentUser = req.session["user_id"];
  const currentListing = req.headers.referer.slice(31);
  listingFunctions.getUserByListing(currentListing)
    .then((listingOwner) => {
      messageFunctions.postMessage(currentUser, listingOwner.user_id, currentListing, req.body.message)
        .then(() => {
          return res.redirect('/');
        });
    });
});

module.exports = router;
