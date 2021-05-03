const express = require('express');
const router = express.Router();
const favoriteFunctions = require('../db/favorite-queries');

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
    });
});

router.post('/:id/remove', (req, res) => {
  const currentUser = req.session["user_id"];
  console.log(currentUser);
  favoriteFunctions.removeFavorite(currentUser, req.params.id)
    .then(() => res.redirect('/'));
});

router.post('/:id/add', (req, res) => {
  const currentUser = req.session["user_id"];
  console.log(currentUser);
  favoriteFunctions.addFavorite(currentUser, req.params.id)
    .then(() => res.redirect('/'));
});

module.exports = router;
