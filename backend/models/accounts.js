const pool = require('../config/db');

async function createTransaction({ userId, type, amount }) {
  const result = await pool.query(
    'INSERT INTO Accounts (user_id, type, amount, transaction_date) VALUES ($1, $2, $3, NOW()) RETURNING *',
    [userId, type, amount]
  );
  return result.rows[0];
}

async function getTransactions(userId) {
  const result = await pool.query(
    'SELECT * FROM Accounts WHERE user_id = $1 ORDER BY transaction_date DESC',
    [userId]
  );
  return result.rows;
}

async function getBalance(userId) {
  const result = await pool.query(
    `SELECT COALESCE(
       SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) -
       SUM(CASE WHEN type = 'withdraw' THEN amount ELSE 0 END), 0) AS balance
     FROM Accounts
     WHERE user_id = $1`,
    [userId]
  );
  return result.rows[0].balance;
}

module.exports = { createTransaction, getTransactions, getBalance };
