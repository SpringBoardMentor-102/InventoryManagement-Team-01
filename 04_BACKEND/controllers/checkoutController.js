const express = require('express');
const router = express.Router();
const Checkout = require('../model/checkout');
const Product = require('../model/productModel');
const Transaction = require('../model/transactionModel');
const { isValidObjectId } = require("mongoose");

class checkoutController {
  // Create Checkout
  static async addCheckout(req, res) {
    try {
      const { user_id, payment_status, total_amount, payment_method, shipping_address, products } = req.body;

      if (!isValidObjectId(user_id)) {
        return res.status(400).json({ errors: "Invalid User ID" });
      }

      // Validate required fields
      if (!user_id || !payment_status || !total_amount || !payment_method || !shipping_address || !products) {
        return res.status(400).json({ errors: "All fields are required" });
      }

      // Validate payment_status
      if (typeof payment_status !== 'number' || ![0, 1, 2].includes(payment_status)) {
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

      // Check product quantities
      for (const product of products) {
        const dbProduct = await Product.findById(product._id);
        if (!dbProduct || dbProduct.quantity < product.quantity) {
          return res.status(400).json({ errors: `Product ${product._id} has insufficient quantity` });
        }

        if (dbProduct.quantity < 3) {
          return res.status(400).json({ errors: `Product ${product._id} has lesser quantity than 3` });
        }
      }

      // Create a new Checkout instance
      const newCheckout = new Checkout({
        user_id,
        payment_status,
        total_amount,
        payment_method,
        shipping_address,
        products
      });

      // Save the new checkout to MongoDB Atlas
      const savedCheckout = await newCheckout.save();

      // Create transactions and update product quantities
      for (const product of products) {
        await Transaction.create({
          checkout_id: savedCheckout._id,
          item_id: product._id,
          quantity: product.quantity,
          amount: product.price * product.quantity
        });

        await Product.findByIdAndUpdate(product._id, {
          $inc: { quantity: -product.quantity }
        });
      }

      res.status(201).json(savedCheckout);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.uuid) {
        return res.status(400).json({ errors: 'ID already exists' });
      }
      console.error(error.message);
      res.status(500).json({ errors: 'Server error' });
    }
  }

  // Get all Checkouts
  static async getCheckouts(req, res) {
    try {
      const checkouts = await Checkout.find().populate('products._id');

      if (checkouts.length === 0) {
        return res.status(404).json({ errors: 'No checkouts found' });
      }

      res.json(checkouts);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  // Get checkout by User ID
  static async getCheckoutByUserId(req, res) {
    try {
      const userId = req.query.user_id;

      if (!userId) {
        return res.status(400).json({ errors: 'User ID is required' });
      }

      const checkout = await Checkout.findOne({ user_id: userId }).populate('products._id');

      if (!checkout) {
        return res.status(404).json({ errors: 'Checkout not found' });
      }

      res.json(checkout);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ errors: 'Server error' });
    }
  }

  // Get checkout by ID
  static async getCheckoutById(req, res) {
    try {
      const checkoutId = req.params.id;

      if (!isValidObjectId(checkoutId)) {
        return res.status(400).json({ errors: 'Invalid checkout ID' });
      }

      const checkout = await Checkout.findById(checkoutId).populate('products._id');

      if (!checkout) {
        return res.status(404).json({ msg: 'Checkout not found' });
      }

      res.json(checkout);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  // Update checkout by ID
  static async updateCheckout(req, res) {
    try {
      const checkoutId = req.params.id;
      const { payment_method, shipping_address } = req.body;

      if (!payment_method && !shipping_address) {
        return res.status(400).json({ errors: 'Please provide payment_method or shipping_address to update' });
      }

      const updatedCheckout = await Checkout.findByIdAndUpdate(
        checkoutId,
        { payment_method, shipping_address },
        { new: true }
      );

      if (!updatedCheckout) {
        return res.status(404).json({ errors: 'Checkout not found' });
      }

      res.json(updatedCheckout);
    } catch (error) {
      console.error(error.message);
      if (error.name === 'CastError') {
        return res.status(400).json({ errors: 'Invalid checkout ID' });
      }
      res.status(500).json({ errors: 'Server error' });
    }
  }

  // Delete checkout by ID
  static async deleteCheckout(req, res) {
    try {
      const checkoutId = req.params.id;

      if (!isValidObjectId(checkoutId)) {
        return res.status(400).json({ errors: 'Invalid checkout ID' });
      }

      const deletedCheckout = await Checkout.findByIdAndDelete(checkoutId);

      if (!deletedCheckout) {
        return res.status(404).json({ msg: 'Checkout not found' });
      }

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
