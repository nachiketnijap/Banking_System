const express = require('express');
const router = express.Router();
const { deposit, withdraw, getUserTransactions } = require('../controllers/transactionController');
const authenticate = require('../middleware/authenticate');

router.post('/deposit', authenticate, deposit);
router.post('/withdraw', authenticate, withdraw);
router.get('/', authenticate, getUserTransactions);

module.exports = router;
