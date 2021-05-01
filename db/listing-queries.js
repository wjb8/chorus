const db = require('./db');

const getListings = () => {
  return db.query('SELECT * FROM listings;')
    .then((response) => {
      return response.rows;
    });
};

const getListingByID = (id) => {
  return db.query('SELECT * FROM listings WHERE id = $1', [id])
    .then((response) => {
      return response.rows[0];
    });
};

const addNewListing = (listing) => {
  return db.query(
    `INSERT INTO listings (user_id, title, description, price, created_at, sold_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *`,
    [listing.user_id, listing.title, listing.description, listing.price])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  getListings,
  getListingByID,
  addNewListing
};
