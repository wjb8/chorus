/*
 * All routes for Listings are defined here
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

router.get('/new', (req, res) => {


  res.send('yes hello this is the create new listing page');
});

router.post('/', (req, res) => {
  listingFunctions.addNewListing()
    .then((listing) => {
      res.json(listing);
    });
});

module.exports = router;
