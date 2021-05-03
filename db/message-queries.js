const db = require('./db');

const getMessages = () => {
  return db.query('SELECT * FROM messages ORDER BY sent_at;')
    .then((response) => {
      return response.rows;
    });
};

const getMessagesWithUser = (userID) => {
  return db.query('SELECT * FROM messages WHERE user_id = $1 ORDER BY sent_at', [userID])
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

module.exports = {
  getMessages,
  getMessagesWithUser,
  getMessagesByListing
};
