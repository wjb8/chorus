const db = require('./db');

const getListings = () => {
  return db.query('SELECT * FROM listings;')
    .then((response) => {
      return response.rows;
    });
};

const getListingByID = (id) => {
  return db.query('SELECT * FROM listings JOIN users ON user_id = users.id WHERE listings.id = $1 GROUP BY listings.id, users.id', [id])
    .then((response) => {
      return response.rows[0];
    });
};

const getListingsFiltered = (maxPrice, minPrice) => {
  return db.query('SELECT * FROM listings WHERE price > $1 AND price < $2', [minPrice, maxPrice])
    .then((response) => {
      return response.rows;
    });
};


const addNewListing = (listing) => {
  return db.query(
    `INSERT INTO listings (user_id, title, description, price, created_at, sold_at)
      VALUES ($1, $2, $3, $4, NOW(), NULL)
      RETURNING *`,
    [listing.userID, listing.title, listing.description, listing.price])
    .then((response) => {
      return response.rows[0];
    });
};

const deleteListing = (listingID) => {
  return db.query('DELETE FROM listings WHERE id = $1', [listingID])
    .then((response) => {
      return 1;
    });
};

module.exports = {
  getListings,
  getListingByID,
  getListingsFiltered,
  addNewListing,
  deleteListing
};
