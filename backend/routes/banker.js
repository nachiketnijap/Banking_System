const express = require('express');
const router = express.Router();
const { getAllAccounts, getTransactionHistory } = require('../controllers/bankerController');
const authenticate = require('../middleware/authenticate');

router.get('/accounts', authenticate, getAllAccounts);
router.get('/accounts/:userId/transactions', authenticate, getTransactionHistory);

module.exports = router;
