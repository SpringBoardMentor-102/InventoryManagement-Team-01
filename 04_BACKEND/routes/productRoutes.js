const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/getAllProducts", productController.getAllProducts);
router.get("/GetProducts/:id", productController.getProductById);
router.post("/createProduct", productController.createProduct);
router.put("/updateProduct/:id", productController.updateProduct);
router.delete("/deleteProducts/:id", productController.deleteProduct);
router.get("/searchProduct", productController.searchProduct);

module.exports = router;
