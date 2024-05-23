const express = require('express');
const Checkout = require('../model/checkout');
const Product = require('../model/productModel');
const { isValidObjectId } = require("mongoose");

class checkoutController {
  // Create Checkout
  static async addCheckout(req, res) {

      const {user_id,cart}= req.body;
      const carts= JSON.parse(cart);

      if (!isValidObjectId(user_id)) {
        return res.status(403).json({ errors: "Invalid User ID" });
      }
      // Validate required fields
      if (!user_id ||  !cart) {
        return res.status(403).json({ errors: "All fields are required" });
      }
        // Check product quantities
        for (const product of carts) {
          const dbProduct = await Product.findById(product.product._id);
          if (!dbProduct || dbProduct.quantity < product.quantity) {
            return res.status(404).json({ errors: `Product ${product.product.name} has insufficient quantity` });
          }
          try {
            const newcheckouts= await Checkout.create({
              user_id: user_id,
              product: product.product._id,
                quantity: product.quantity,
                price: product.product.price
            })

            const response=await Product.findByIdAndUpdate(product.product._id, {
              $inc: { quantity: -product.quantity }
            });

           return  res.status(201).json({message:" Checkout done succesfully"})
          } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: 'Server error' });
          }
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
