const express = require('express');
const Product = require('../model/Searchbar'); // Importing the Searchbar model

const router = express.Router();

// GET route to fetch products with pagination, filtering, sorting, and searching
router.get('/products', async (req, res) => {
  try {
    // Parsing query parameters for pagination, search, sorting, and filtering
    const page = parseInt(req.query.page) - 1 || 0; // Current page, default to 0
    const limit = parseInt(req.query.limit) || 5; // Number of items per page, default to 5
    const search = req.query.search || ''; // Search query, default to empty string
    let sort = req.query.sort || 'rating'; // Sort field, default to 'rating'
    let details = req.query.details || 'All'; // Details filter, default to 'All'

    // Available options for details filtering
    const detailsOptions = [
      'electronics',
      'books',
      'glass',
      'mobiles',
      'powerbank',
      'washing machine',
    ];

    // If details filter is 'All', include all options, else parse details filter
    details = details === 'All' ? detailsOptions : req.query.details.split(',');

    // Parse sort parameters, default to ascending order if no direction provided
    sort = req.query.sort ? req.query.sort.split(',') : [sort];

    let sortBy = {};
    // Check if sort direction is provided, otherwise default to ascending
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = 'asc';
    }

    // Query products based on search, details filter, sorting, pagination
    const products = await Product.find({
      name: { $regex: search, $options: 'i' },
    })
      .where('details')
      .in(details)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    // Count total documents matching the query for pagination
    const total = await Product.countDocuments({
      details: { $in: details },
      name: { $regex: search, $options: 'i' },
    });

    // Response object with pagination info, available details options, and products
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      details: detailsOptions,
      products,
    };

    // Send response
    res.status(200).json(response);
  } catch (err) {
    // Handle errors
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

module.exports = router;