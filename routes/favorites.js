const express = require('express');
const router = express.Router();
const favoriteFunctions = require('../db/favorite-queries');

router.get('/', (req, res) => {
  const currentUser = req.session["user_id"];
  console.log(currentUser);
  favoriteFunctions.getUserFavorites(currentUser)
    .then((favorites) => {
      console.log(favorites);
      res.json(favorites);
    });
});

router.post('/:id/remove', (req, res) => {
  const currentUser = req.session["user_id"];
  console.log(currentUser);
  favoriteFunctions.removeFavorite(req.params.id)
    .then(() => res.redirect('/'));
});

router.post('/:id/add', (req, res) => {
  const currentUser = req.session["user_id"];
  console.log(currentUser);
  favoriteFunctions.addFavorite(req.params.id)
    .then(() => res.redirect('/'));
});

module.exports = router;
