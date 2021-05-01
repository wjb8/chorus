const db = require('./db');

const getUserFavorites = (currentUser) => {
  return db.query('SELECT * FROM favorites WHERE user_id = $1;', [currentUser])
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getUserFavorites
};
