const uuid = require('uuid');
const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: String,
    required: true
  },
  payment_status: {
    type: Number,
    required: true
  },
  total_amount: {
    type: Number,
    required: true
  },
  payment_method: {
    type: String,
    required: true
  },
  shipping_address: {
    type: String,
    required: true
  },
  date_of_creation: {
    type: Date,
    default: Date.now
  }
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
