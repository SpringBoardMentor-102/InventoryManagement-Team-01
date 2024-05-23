
const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  payment_status: {
    type: Number,
    // required: true
  },
  total_amount: {
    type: Number,
    // required: true
  },
  payment_method: {
    type: String,
    // required: true
  },
  shipping_address: {
    type: String,
    // required: true
  },
  product: {
   type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true ,
  },
  quantity:{
    type: Number, required: true 
  },
  price: { type: Number, required: true },
  date_of_creation: {
    type: Date,
    default: Date.now
  }
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
