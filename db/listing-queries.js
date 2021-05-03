const db = require('./db');

const getListings = (options, limit = 10) => {

  const queryParams = [];
  let queryString = `SELECT * FROM listings\n`;
  let clause = 'WHERE';

  if (options.minPrice) {
    queryParams.push(`${options.minPrice}`);
    queryString += `${clause} price >= $${queryParams.length}`;
    clause = 'AND';
  }

  if (options.maxPrice) {
    queryParams.push(`${options.maxPrice}`);
    queryString += `${clause} price <= $${queryParams.length}`;
    clause = 'AND';
  }

  queryParams.push(limit);
  queryString += `
    GROUP BY listings.id
    ORDER BY price
    LIMIT $${queryParams.length};
  `;

  return db.query(queryString, queryParams)
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
