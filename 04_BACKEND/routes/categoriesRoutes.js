const CategoryController = require("../controllers/CategoryController.js");
const Router = require("express");
const router = Router();

// Add categories
router.post("/addcategory", CategoryController.addCategory);
// Get all categories
router.get("/getallcategory", CategoryController.allCategories);
// Get category by id
router.get("/getcategory/:id", CategoryController.getCategory);
// Update category
router.put("/updatecategory/:id", CategoryController.updateCategory);
// Delete category
router.delete("/deletecategory/:id", CategoryController.deleteCategory);

module.exports = router;

