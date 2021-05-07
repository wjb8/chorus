const db = require('./db');

const getUserFavorites = (currentUser) => {
  return db.query('SELECT listings.id, listings.title, listings.price, listings.image_url FROM favorites JOIN listings ON listing_id = listings.id WHERE favorites.user_id = $1 GROUP BY favorites.id, listings.id;', [currentUser])
    .then((response) => {
      return response.rows;
    });
};

const addFavorite = (userID, listingID) => {
  return db.query('INSERT INTO favorites(user_id, listing_id) VALUES($1, $2) RETURNING *;', [userID, listingID])
    .then((response) => {
      return response.rows;
    });
};

const removeFavorite = (userID, listingID) => {
  return db.query('DELETE FROM favorites WHERE user_id = $1 AND listing_id = $2;', [userID, listingID])
    .then((response) => {
      return response.rows;
    });
};

const checkForDuplicateFavorite = (userID, listingID) => {
  return db.query('SELECT id FROM favorites WHERE user_id = $1 AND listing_id = $2;', [userID, listingID])
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getUserFavorites,
  addFavorite,
  removeFavorite,
  checkForDuplicateFavorite
};
