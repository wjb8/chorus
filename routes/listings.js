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
      const templateVars = { listings };

      return res.render('listings', templateVars);
    });
});

router.get('/new', (req, res) => {
  res.render('new_listing');
});

router.get('/:id', (req, res) => { //=> View Specific Listing
  listingFunctions.getListingByID(req.params.id)
    .then((listing) => {
      const templateVars = { listing };

      return res.render('view_listing', templateVars);
    });
});

router.post('/', (req, res) => {
  const user = req.session.user_id;

  if (!user) {
    res.redirect('/login');
    return;
  }

  const newListing = { userID: user, title: req.body.title, description: req.body.description, price: req.body.price };

  listingFunctions.addNewListing(newListing)
    .then(() => res.redirect('/'));
});

router.post('/:id', (req, res) => { //=> Update listing
  const user = req.session.user_id;

  if (!user) {
    res.redirect('/login');
    return;
  }

  listingFunctions.updateListing(req.body.updateListing)
    .then(() => res.redirect('/'));
});

router.post('/:id/delete', (req, res) => {
  const user = req.session.user_id;

  if (!user) {
    res.redirect('/login');
    return;
  }

  listingFunctions.deleteListing(req.params.id)
    .then(() => res.redirect('/'));
});

module.exports = router;
