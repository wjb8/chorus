const db = require('./db');

const isAdmin = (userID) => {
  return db.query('SELECT is_admin FROM users WHERE id = $1;', [userID])
    .then((response) => {
      if (response.rows[0]) {
        return response.rows[0].is_admin;
      }
      return false;
    });
};

module.exports = {
  isAdmin
};
