const db = require('./db');

const getMessages = () => {
  return db.query('SELECT * FROM messages;')
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getMessages
};
