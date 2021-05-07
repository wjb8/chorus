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
  favoriteFunctions.removeFavorite(currentUser, req.params.id)
    .then(() => {
      if (req.headers.referer.includes('listings')) {
        return res.redirect(req.headers.referer);
      }
      return res.redirect('/favorites');
    });
});

router.post('/:id/add', (req, res) => {
  const currentUser = req.session["user_id"];
  const source = req.headers.referer;

  favoriteFunctions.checkForDuplicateFavorite(currentUser, req.params.id)
    .then((duplicates) => {
      if (duplicates.length === 0) {


        favoriteFunctions.addFavorite(currentUser, req.params.id)
          .then(() => {
            if (source.includes('listings')) {
              return res.redirect(source);
            }
            return res.redirect('/favorites');
          });
      }
      return res.redirect('/favorites');
    });
});

module.exports = router;
