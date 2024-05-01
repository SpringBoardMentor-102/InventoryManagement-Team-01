const Product = require("../model/productModel");
const axios = require("axios");

async function getAllProducts(req, res) {
  // try {
  //   const products = await Product.find();

  //   // Check if there are no checkouts
  //   if (products.length === 0) {
  //     return res.status(404).json({ msg: "No products found" });
  //   }
  //   const categoryid = products[1].category_id;
  //   console.log(products[1].category_id);
  //   const response = await axios.get(
  //     `http://localhost:5000/api/category/getcategory/${categoryid}`
  //   );
  //   console.log(response.data.categoryName);
  //   res.json({ product: products, category: response.data.categoryName });
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }

  try {
    // Use the aggregate method to perform a MongoDB aggregation
    const products = await Product.aggregate([
      // The $lookup stage performs a left outer join to another collection named "categories"
      {
        $lookup: {
          // Specifies the collection to join with
          from: "categories",
          // Specifies the local field in the "products" collection
          localField: "categoryId",
          // Specifies the field in the "categories" collection
          foreignField: "_id",
          // Specifies the field in the output document where the joined array is stored
          as: "category",
        },
      },
      // The $unwind stage deconstructs the "category" array created by the $lookup stage
      {
        $unwind: "$category",
      },
      // The $project stage reshapes the output document, including only the required fields
      {
        $project: {
          name: 1, // Include the "name" field from the "products" collection
          description: 1, // Include the "description" field from the "products" collection
          price: 1, // Include the "price" field from the "products" collection
          quantity: 1, // Include the "quantity" field from the "products" collection
          status: 1, // Include the "status" field from the "products" collection
          category: "$category.categoryName", // Include the "name" field from the "category" subdocument
          imageUrl: 1, // Include the "image_url" field from the "products" collection
          createdAt: { $ifNull: ["$createdAt", null] }, // Include createdAt field, or null if it doesn't exist
          updatedAt: { $ifNull: ["$updatedAt", null] }, // Include updatedAt field, or null if it doesn't exist
        },
      },
    ]);

    // Check if no products were found
    if (products.length === 0) {
      return res.status(404).json({ msg: "No products found" });
    }

    // Respond with the products in a JSON format
    return res.json({ products });
  } catch (err) {
    // Handle any errors that occur during the aggregation
    return res.status(500).json({ message: err.message });
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
  // const product = new Product(req.body);
  // try {
  //   const newProduct = await product.save();
  //   res.status(201).json(newProduct);
  // } catch (err) {
  //   // if (error.code === 11000 && error.keyPattern && error.keyPattern.uuid) {
  //   //   return res.status(400).json({ msg: 'UUID already exists' });
  //   // }
  //   res.status(400).json({ message: err.message });
  // }

  // Destructure the request body to extract the required fields
  const { name, description, price, quantity, status, categoryId, imageUrl } =
    req.body;

  try {
    // Create a new product instance using the extracted fields
    const product = new Product({
      name,
      description,
      price,
      quantity,
      status,
      categoryId,
      imageUrl,
    });
    // Save the new product to the database
    const newProduct = await product.save();
    // Return the newly created product as a JSON response with status code 201 (Created)
    return res.status(201).json(newProduct);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.name) {
      // Duplicate name error
      return res
        .status(400)
        .json({ message: "Product with this name already exists" });
    }
    // For other errors, return a generic error message
    return res.status(400).json({ message: err.message });
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
