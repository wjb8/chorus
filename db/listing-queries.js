const db = require('./db');

//Gets all listings, optionally takes in filter params min and max price
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

  // Order listings newest to oldest. Default page load shows 10 newest listings
  queryParams.push(limit);
  queryString += `
    GROUP BY listings.id
    ORDER BY created_at DESC
    LIMIT $${queryParams.length};
  `;

  return db.query(queryString, queryParams)
    .then((response) => {
      return response.rows;
    });
};

//Get specific listing, join owner user to display contact info
const getListingByID = (id) => {
  return db.query(`SELECT listings.id as listing_id, *
                  FROM listings
                  JOIN users ON user_id = users.id
                  WHERE listings.id = $1 GROUP BY listings.id, users.id`, [id])
    .then((response) => {
      return response.rows[0];
    })
    .catch(err => console.log(err.message));
};

//Make new listing created at NOW with null sold_at by default
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

const updateListing = (listing) => {
  return db.query(
    `UPDATE listings
      SET title = $2, description = $3, price = $4
      WHERE id = $1'
      RETURNING *`,
    [listing.id, listing.title, listing.description, listing.price])
    .then((response) => {
      return response.rows[0];
    });
};

const markSold = (listingID) => {
  return db.query(
    `UPDATE listings
      SET sold_at = NOW()
      WHERE id = $1
      RETURNING *;`,
    [listingID])
    .then((response) => {
      return response.rows[0];
    });
};

//Clear the sold_at time if admin removes sold tag
const markUnsold = (listingID) => {
  return db.query(
    `UPDATE listings
      SET sold_at = null
      WHERE id = $1
      RETURNING *;`,
    [listingID])
    .then((response) => {
      return response.rows[0];
    });
};

const deleteListing = (listingID) => {
  return db.query('DELETE FROM listings WHERE id = $1;', [listingID])
    .then((response) => {
      return response.rows;
    });
};

//Helper used to find the owner user from a listing id
const getUserByListing = (listingID) => {
  return db.query('SELECT user_id FROM listings WHERE id = $1;', [listingID])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  getListings,
  getListingByID,
  addNewListing,
  updateListing,
  markSold,
  markUnsold,
  deleteListing,
  getUserByListing
};
