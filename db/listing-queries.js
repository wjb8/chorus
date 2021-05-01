const db = require('./db');

const getListings = () => {
  return db.query('SELECT * FROM listings;')
    .then((response) => {
      return response.rows;
    });
};

const getListingsByID = (id) => {
  return db.query('SELECT * FROM listings WHERE id = $1', [id])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  getListings,
  getListingsByID
};
