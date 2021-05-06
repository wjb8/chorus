/*
 * All routes for Listings are defined here
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const listingFunctions = require('../db/listing-queries');
const userFunctions = require('../db/user_queries');

router.get('/', (req, res) => {
  const { minPrice, maxPrice } = req.query;
  console.log(minPrice, maxPrice);
  if ((req.query.minPrice && isNaN(Number(req.query.minPrice))) || (req.query.maxPrice && isNaN(Number(req.query.maxPrice)))) {
    res.statusCode = 400;
    return res.send("Error: If entering min or max price, they must be numbers!");
  }


  listingFunctions.getListings(req.query)
    .then((listings) => {
      const templateVars = { listings };

      return res.render('listings', templateVars);
    })
    .catch(err => console.log(err.message));
});

router.get('/new', (req, res) => {  //=> Create new listing
  const user = req.session.user_id;

  userFunctions.isAdmin(user)
    .then((isAdmin) => {
      if (!isAdmin) {
        return res.redirect('/listings');
      }
      res.render('new_listing');
    });
});

router.get('/:id', (req, res) => { //=> View Specific Listing
  const user = req.session.user_id;

  listingFunctions.getListingByID(req.params.id)
    .then((listing) => {
      userFunctions.isAdmin(user)
        .then((isAdmin) => {
          userFunctions.getUserFavorites(user)
            .then((favorites) => {
              console.log(favorites);
              const templateVars = { listing, isAdmin, user, favorites };
              return res.render('view_listing', templateVars);
            });
        });
    });
});

router.post('/', (req, res) => {  //=> Make new listing
  const user = req.session.user_id;

  if (!user) {
    res.redirect('/login');
    return;
  }

  const newListing = { userID: user, title: req.body.title, description: req.body.description, price: req.body.price };

  if (newListing.title === '' || newListing.description === '' || newListing.price === '') {
    res.statusCode = 400;
    return res.send("Error: Title, price, and description fields must not be empty!");
  }

  if (typeof (Number(newListing.price)) !== 'number' || Number(newListing.price).toFixed(2) === '0.00') {
    res.statusCode = 400;
    return res.send("Error: Price must be an integer!");
  }

  listingFunctions.addNewListing(newListing)
    .then(() => res.redirect('/listings'))
    .catch(err => console.log(err.message));
});

router.post('/:id/delete', (req, res) => {  //=> Delete listing
  const user = req.session.user_id;

  if (!user) {
    res.redirect('/login');
    return;
  }

  listingFunctions.deleteListing(req.params.id)
    .then(() => res.redirect('/listings'))
    .catch(err => console.log(err.message));
});

router.post('/:id/sold', (req, res) => {  //=> Mark sold
  const user = req.session.user_id;

  if (!user) {
    res.redirect('/login');
    return;
  }

  listingFunctions.markSold(req.params.id)
    .then(() => {
      res.redirect(`/listings/${req.params.id}`);
    })
    .catch(err => console.log(err.message));
});

router.post('/:id/unsold', (req, res) => {  //=> Mark unsold
  const user = req.session.user_id;

  if (!user) {
    res.redirect('/login');
    return;
  }

  listingFunctions.markUnsold(req.params.id)
    .then(() => {
      res.redirect(`/listings/${req.params.id}`);
    })
    .catch(err => console.log(err.message));
});

router.post('/:id', (req, res) => { //=> Update listing
  const user = req.session.user_id;

  if (!user) {
    res.redirect('/login');
    return;
  }

  const updateListing = {
    userID: user,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  };

  listingFunctions.updateListing(updateListing)
    .then(() => res.redirect(`/listings/${req.params.id}`))
    .catch(err => console.log(err.message));
});



module.exports = router;
