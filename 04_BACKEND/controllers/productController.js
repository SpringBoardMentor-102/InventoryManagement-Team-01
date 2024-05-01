const Product = require("../model/productModel");

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();

      // Check if there are no checkouts
      if (products.length === 0) {
        return res.status(404).json({ msg: 'No products found' });
      }
  
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
* Controller function for Getting product by ID
* @param {string} id - Product ID
* @returns {Promise<Object>} 
*/
async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
* Controller function for Create a new product
* @param {Object} productData - Data for the new product
* @returns {Promise<Object>} 
*/
async function createProduct(req, res) {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.uuid) {
      return res.status(400).json({ msg: 'UUID already exists' });
    }
    res.status(400).json({ message: err.message });
  }
}

/**
* Controller function for Update product by ID
* @param {string} id - Product ID
* @param {Object} newData 
* @returns {Promise<Object>} 
*/
async function updateProduct(req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

/**
* Controller function for Delete product by ID
* @param {string} id - Product ID
* @returns {Promise<Object>} 
*/
async function deleteProduct(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
