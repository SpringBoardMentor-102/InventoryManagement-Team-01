productModel.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'out of stock'],
        required: true
    },
    category_id: {
        type: Number,
        required: true
    },
    image_url: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
