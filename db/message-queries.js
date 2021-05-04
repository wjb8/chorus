const db = require('./db');

const getMessages = () => {
  return db.query('SELECT * FROM messages ORDER BY sent_at;')
    .then((response) => {
      return response.rows;
    });
};

const getMessagesWithUser = (userID) => {
  return db.query('SELECT * FROM messages WHERE from_user_id = $1 OR to_user_id = $1 ORDER BY sent_at', [userID])
    .then((response) => {
      return response.rows;
    });
};

const getMessagesToUser = (userID) => {
  return db.query('SELECT * FROM messages WHERE to_user_id = $1 ORDER BY sent_at', [userID])
    .then((response) => {
      return response.rows;
    });
};

const getMessagesByListing = (listingID) => {
  return db.query('SELECT * FROM messages WHERE listing_id = $1 ORDER BY sent_at', [listingID])
    .then((response) => {
      return response.rows;
    });
};

const postMessage = (currentUser, toUser, listing, message) => {
  return db.query('INSERT INTO messages(from_user_id, to_user_id, listing_id, message, sent_at) VALUES($1, $2, $3, $4, NOW());', [currentUser, toUser, listing, message])
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getMessages,
  getMessagesWithUser,
  getMessagesToUser,
  getMessagesByListing,
  postMessage
};
