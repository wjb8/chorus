/*
 * All routes for Messages are defined here
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const messageFunctions = require('../db/message-queries');

router.get('/', (req, res) => {
  messageFunctions.getListings()
    .then((messages) => {
      res.json(messages);
    });
});

module.exports = router;
