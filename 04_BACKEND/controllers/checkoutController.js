const express = require('express');
const router = express.Router();
const Checkout = require('../model/checkout');
const { isValidObjectId } = require("mongoose");

class checkoutController {
 //Create CheckOut
 static async addCheckout(req, res) {
  try {
    const { user_id, payment_status, total_amount, payment_method, shipping_address } = req.body;

    if (!isValidObjectId(user_id)) {
      return res.status(400).json({ errors: "Invalid User ID" });
    }

    // Validate required fields
    if (!user_id || !payment_status || !total_amount || !payment_method || !shipping_address) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    // Validate payment_status
    if (typeof payment_status !== 'string' || !['paid', 'pending', 'failed'].includes(payment_status)) {
      return res.status(400).json({ errors: "Invalid payment_status" });
    }

    // Validate total_amount
    if (typeof total_amount !== 'number' || total_amount <= 0) {
      return res.status(400).json({ errors: "Invalid total_amount" });
    }

    // Validate payment_method
    if (typeof payment_method !== 'string' || !['credit_card', 'paypal', 'cash_on_delivery'].includes(payment_method)) {
      return res.status(400).json({ errors: "Invalid payment_method" });
    }

    // Validate shipping_address
    if (typeof shipping_address !== 'string' || shipping_address.trim() === '') {
      return res.status(400).json({ errors: "Invalid shipping_address" });
    }

    // Create a new Checkout instance
    const newCheckout = new Checkout({
      user_id,
      payment_status,
      total_amount,
      payment_method,
      shipping_address
    });

    // Save the new checkout to MongoDB Atlas
    const savedCheckout = await newCheckout.save();

    res.status(201).json(savedCheckout);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.uuid) {
      return res.status(400).json({ errors: 'ID already exists' });
    }
    console.error(error.message);
    res.status(500).json({ errors: 'Server error' });
  }
}


//Get all Checkouts
static async getCheckouts(req, res) {
  try {
    // Fetch all checkouts from MongoDB Atlas
    const checkouts = await Checkout.find();

    // Check if there are no checkouts
    if (checkouts.length === 0) {
      return res.status(404).json({ errors: 'No checkouts found' });
    }

    // Return the list of checkouts
    res.json(checkouts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
    }

//Get checkout by User_Id
static async getCheckoutByUserId(req, res) {
  try {
    const userId = req.query.user_id;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ errors: 'User ID is required' });
    }

    // Fetch the checkout by user_id from MongoDB Atlas
    const checkout = await Checkout.findOne({ user_id: userId });

    // Check if the checkout with the given user_id exists
    if (!checkout) {
      return res.status(404).json({ errors: 'Checkout not found' });
    }

    // Return the checkout
    res.json(checkout);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: 'Server error' });
  }
}


//Get checkout by Id
static async getCheckoutById(req, res) {
//   try {
//     const checkoutId = req.params.id;

//     // Fetch the checkout by _id from MongoDB Atlas
//     const checkout = await Checkout.findById(checkoutId);

//     // Check if the checkout with the given _id exists
//     if (!checkout) {
//       return res.status(404).json({ msg: 'Checkout not found' });
//     }

//     // Return the checkout
//     res.json(checkout);
//   } catch (error) {
//     console.error(error.message);
 
//     if (error.name === 'CastError') {
//       return res.status(400).json({ msg: 'Invalid checkout ID' });
//     }
//     res.status(500).json({ msg: 'Server error' });
//   }
     }

//Update checkout by Id
static async updateCheckout(req, res) {
  try {
    const checkoutId = req.params.id;
    const { payment_method, shipping_address } = req.body;

    // Validate if at least one field is provided for update
    if (!payment_method && !shipping_address) {
      return res.status(400).json({ errors: 'Please provide payment_method or shipping_address to update' });
    }

    // Update the checkout by _id in MongoDB Atlas
    const updatedCheckout = await Checkout.findByIdAndUpdate(
      checkoutId,
      { payment_method, shipping_address },
      { new: true } 
    );

    // Check if the checkout with the given _id exists
    if (!updatedCheckout) {
      return res.status(404).json({ errors: 'Checkout not found' });
    }

    // Return the updated checkout
    res.json(updatedCheckout);
  } catch (error) {
    console.error(error.message);
   
    if (error.name === 'CastError') {
      return res.status(400).json({ errors: 'Invalid checkout ID' });
    }
    res.status(500).json({ errors: 'Server error' });
  }
}


//Delete checkout by Id
static async deleteCheckout(req, res) {
  try {
    const checkoutId = req.params.id;

    // Delete the checkout by _id from MongoDB Atlas
    const deletedCheckout = await Checkout.findByIdAndDelete(checkoutId);

    // Check if the checkout with the given _id exists
    if (!deletedCheckout) {
      return res.status(404).json({ msg: 'Checkout not found' });
    }

    // Return a success message
    res.json({ msg: 'Checkout deleted successfully' });
  } catch (error) {
    console.error(error.message);
   
    if (error.name === 'CastError') {
      return res.status(400).json({ msg: 'Invalid checkout ID' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
    }
}

module.exports = checkoutController;
