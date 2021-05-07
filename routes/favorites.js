const express = require('express');
const router = express.Router();
const favoriteFunctions = require('../db/favorite-queries');

//Redirects user away from all these routes if they are not logged in
router.use((req, res, next) => {
  if (!req.session["user_id"]) {
    res.redirect('/login');
  }

  next();
});

router.get('/', (req, res) => {
  const currentUser = req.session["user_id"];
  favoriteFunctions.getUserFavorites(currentUser)
    .then((favorites) => {
      const templateVars = { favorites };
      return res.render('favorites', templateVars);
    }).catch(err => console.log(err));
});

//Remove favorite can be triggered from both the favorites page as well as the listing view page, redirect accordingly
router.post('/:id/remove', (req, res) => {
  const currentUser = req.session["user_id"];
  favoriteFunctions.removeFavorite(currentUser, req.params.id)
    .then(() => {
      if (req.headers.referer.includes('listings')) {
        return res.redirect(req.headers.referer);
      }
      return res.redirect('/favorites');
    }).catch(err => console.log(err));
});

//Add new favorite to the currently logged in user
router.post('/:id/add', (req, res) => {
  const currentUser = req.session["user_id"];

  favoriteFunctions.addFavorite(currentUser, req.params.id)
    .then(() => {
      if (req.headers.referer.includes('listings')) {
        return res.redirect(req.headers.referer);
      }
      return res.redirect('/favorites');
    }).catch(err => console.log(err));

});

module.exports = router;
