const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middleware/auth");
const authMiddleware = require("../middleware/auth");

// Added Protected routes
router.get("/getAllProducts", authMiddleware, productController.getAllProducts);
router.get(
  "/GetProducts/:id",
  authMiddleware,
  productController.getProductById
);
router.post("/createProduct", authMiddleware, productController.createProduct);
router.put(
  "/updateProduct/:id",
  authMiddleware,
  productController.updateProduct
);
router.delete(
  "/deleteProducts/:id",
  authMiddleware,
  productController.deleteProduct
);
router.get("/searchProduct", authMiddleware, productController.searchProduct);

module.exports = router;
