const Product = require("../model/productModel");
const axios = require("axios");
const {
  validateName,
  validateDescription,
  validatePrice,
  validateQuantity,
  validateStatus,
  validateCategoryId,
  validateImageUrl,
} = require("./utilities/validators/producModelValidators");
const { isValidObjectId } = require("mongoose");

/**
 * Controller function for Getting all product
 * @param {*} req
 * @param {*} res
 * @returns products json
 */
async function getAllProducts(req, res) {
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
      return res.status(404).json({ errors: "No products found" });
    }

    // Respond with the products in a JSON format
    return res.json({ products });
  } catch (err) {
    // Handle any errors that occur during the aggregation
    return res.status(500).json({ errors: err.message });
  }
}

/**
 * Controller function for Getting product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>}
 */
async function getProductById(req, res) {
  try {
    // Validate if the request parameter 'id' is a valid MongoDB ObjectId
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ errors: "Invalid product ID" });
    }

    // Find a product by its ID
    const product = await Product.findById(req.params.id);

    // Check if the product exists
    if (!product) {
      // If the product does not exist, respond with a 404 error
      return res.status(404).json({ errors: "Product not found" });
    }

    // If the product exists, respond with the product in JSON format
    return res.json(product);
  } catch (err) {
    // Handle any errors that occur during the database query
    return res.status(500).json({ errors: err.message });
  }
}

/**
 * Controller function for Create a new product
 * @param {Object} productData - Data for the new product
 * @returns {Promise<Object>}
 */
async function createProduct(req, res) {
  // Destructure the request body to extract the required fields
  const { name, description, price, quantity, status, categoryId, imageUrl } =
    req.body;

  try {
    // Validate the request body fields
    const validationResponses = {
      nameResponse: validateName(name),
      descriptionResponse: validateDescription(description),
      priceResponse: validatePrice(price),
      quantityResponse: validateQuantity(quantity),
      // statusResponse: validateStatus(status),
      categoryIdResponse: validateCategoryId(categoryId),
      // imageUrlResponse: validateImageUrl(imageUrl),
    };

    // Check each validation response
    let returnMessage = "";
    let isValidationFail = false;
    for (const key in validationResponses) {
      let value = validationResponses[key];
      if (value !== null) {
        // Add the validation failure message to the final return message if found
        returnMessage += value.message + " ";
        isValidationFail = true;
      }
    }

    if (isValidationFail) {
      // Return a 422 status code when validation failure occurs
      return res.status(422).json({ errors: returnMessage });
    }

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
        .json({ errors: "Product with this name already exists" });
    }
    // For other errors, return a generic error message
    return res.status(400).json({ errors: err.message });
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
    // Update the product with the provided ID using the request body
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // Check if the product was updated successfully
    if (updatedProduct) {
      // Respond with the updated product in JSON format
      res.json(updatedProduct);
    } else {
      // If the product does not exist, respond with a 404 error
      res.status(404).json({ errors: "Product not found" });
    }
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
}

/**
 * Controller function for Delete product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>}
 */
async function deleteProduct(req, res) {
  try {
    // Validate if the request parameter 'id' is a valid MongoDB ObjectId
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ errors: "Invalid product ID" });
    }

    // Attempt to find and delete the product by its ID
    await Product.findByIdAndDelete(req.params.id);

    // Respond with a success message if the deletion was successful
    res.json({ errors: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
}

/**
 * Controller function for Retrieving products by category name
 * @param {*} req
 * @param {*} res
 * @returns products json
 */
async function getProductsByCategory(req, res) {
  try {
    const { categoryName } = req.query;
    if (!categoryName) {
      return res.status(400).json({ errors: "Category name is required" });
    }

    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $match: {
          "category.categoryName": categoryName,
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          quantity: 1,
          status: 1,
          category: "$category.categoryName",
          imageUrl: 1,
          createdAt: { $ifNull: ["$createdAt", null] },
          updatedAt: { $ifNull: ["$updatedAt", null] },
        },
      },
    ]);

    if (products.length === 0) {
      return res
        .status(404)
        .json({ errors: "No products found for this category" });
    }

    return res.json({ products });
  } catch (err) {
    return res.status(500).json({ errors: err.message });
  }
}

//Function for searching product
async function searchProduct(req, res) {
  try {
    let { name } = req.query;
    name = name.trim();

    const products = await Product.find({
      name: { $regex: new RegExp(name, "i") },
    });

    if (products.length > 0) {
      res.json(products);
    } else {
      // Send an empty array as response to indicate no products found
      res.json([]);
    }
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
  searchProduct,
  getProductsByCategory,
};
