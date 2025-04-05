const pool = require('../config/db');

async function getAllAccounts(req, res) {
  try {
    const result = await pool.query(
      `SELECT u.id, u.username, u.email,
        (SELECT COALESCE(SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) -
                          SUM(CASE WHEN type = 'withdraw' THEN amount ELSE 0 END),0)
         FROM Accounts WHERE user_id = u.id) AS balance
       FROM Users u WHERE u.role = 'customer'`
    );
    res.json({ accounts: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTransactionHistory(req, res) {
  try {
    const userId = req.params.userId;
    const result = await pool.query(
      'SELECT * FROM Accounts WHERE user_id = $1 ORDER BY transaction_date DESC',
      [userId]
    );
    res.json({ transactions: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllAccounts, getTransactionHistory };
