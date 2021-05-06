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

const getUserFavorites = (userID) => {
  return db.query(`SELECT * FROM favorites
                    JOIN users ON users.id = user_id
                    WHERE users.id = $1`, [userID])
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  isAdmin,
  getUserFavorites
};
