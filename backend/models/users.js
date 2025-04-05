const pool = require('../config/db');
const bcrypt = require('bcrypt');

async function createUser({ username, email, password, role }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO Users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [username, email, hashedPassword, role]
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
  return result.rows[0];
}

async function verifyPassword(user, password) {
  return bcrypt.compare(password, user.password);
}

module.exports = { createUser, findUserByEmail, verifyPassword };
