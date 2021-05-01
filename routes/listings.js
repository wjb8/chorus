/*
 * All routes for Listings are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const listingFunctions = require('../db/listing-queries');

router.get('/', (req, res) => {
  listingFunctions.getListings()
    .then((listings) => {
      res.json(listings);
    });
});

router.get('/:id', (req, res) => {
  listingFunctions.getListingByID(req.params.id)
    .then((listing) => {
      res.json(listing);
    });
});







module.exports = router;
