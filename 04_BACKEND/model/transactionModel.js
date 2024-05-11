const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    required: true
  },
  checkoutId: {
    type: String,
    required: true
  },
  items: [{
    itemId: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }]
});

const Transaction = mongoose.model('transaction', TransactionSchema);
module.exports = Transaction;
