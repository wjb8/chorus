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

router.get('/new', (req, res) => {
  res.send('yes hello this is the create new listing page');
});

router.get('/:id', (req, res) => {
  listingFunctions.getListingByID(req.params.id)
    .then((listing) => {
      res.json(listing);
    });
});

router.post('/', (req, res) => {
  const user = req.session.user_id;

  if (!user) {
    res.statusCode = 401;
    res.send('Error: Please log in');
    return;
  }

  listingFunctions.addNewListing(req.body.newListing)
    .then(() => res.redirect('/'));
});

router.post('/:id', (req, res) => { //=> Update listing
  const user = req.session.user_id;

  if (!user) {
    res.statusCode = 401;
    res.send('Error: Please log in');
    return;
  }

  listingFunctions.updateListing(req.body.updateListing)
    .then(() => res.redirect('/'));
});

router.post('/:id/delete', (req, res) => {
  const user = req.session.user_id;

  if (!user) {
    res.statusCode = 401;
    res.send('Error: Please log in');
    return;
  }

  listingFunctions.deleteListing(req.params.id)
    .then(() => res.redirect('/'));
});

module.exports = router;
