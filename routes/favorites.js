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

module.exports = router;
