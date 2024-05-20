const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getAllTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

// 1. Create a Transaction (POST)
router.post('/createTransaction', createTransaction);

// 2. Retrieve All Transactions (GET)
router.get('/listTransaction', getAllTransaction);

// 3. Retrieve a Specific Transaction by ID (GET)
router.get('/getTransaction/:id', getTransactionById);

// 4. Update a Transaction by ID (PUT)
router.put('/updateTransaction/:id', updateTransaction);

// 5. Delete a Transaction by ID (DELETE)
router.delete('/deleteTransaction/:id', deleteTransaction);

module.exports = router;