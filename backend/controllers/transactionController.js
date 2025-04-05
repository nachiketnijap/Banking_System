const { createTransaction, getTransactions, getBalance } = require('../models/accounts');

async function deposit(req, res) {
  try {
    const { amount } = req.body;
    const userId = req.user.id;
    const transaction = await createTransaction({ userId, type: 'deposit', amount });
    res.status(201).json({ message: 'Deposit successful', transaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function withdraw(req, res) {
  try {
    const { amount } = req.body;
    const userId = req.user.id;
    const balance = await getBalance(userId);
    if (Number(amount) > Number(balance)) {
      return res.status(400).json({ message: 'Insufficient Funds' });
    }
    const transaction = await createTransaction({ userId, type: 'withdraw', amount });
    res.status(201).json({ message: 'Withdrawal successful', transaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getUserTransactions(req, res) {
  try {
    const userId = req.user.id;
    const transactions = await getTransactions(userId);
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { deposit, withdraw, getUserTransactions };
