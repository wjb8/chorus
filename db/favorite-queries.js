const db = require('./db');

const getUserFavorites = (currentUser) => {
  return db.query('SELECT * FROM favorites WHERE user_id = $1;', [currentUser])
    .then((response) => {
      return response.rows;
    });
};

const addFavorite = (userID, listingID) => {
  return db.query('INSERT INTO favorites(user_id, listing_id) VALUES($1, $2)', [userID, listingID])
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getUserFavorites,
  addFavorite
};
