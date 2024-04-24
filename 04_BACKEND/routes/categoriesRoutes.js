const CategoryController = require("../controllers/CategoryController.js");
const Router = require("express");
const router = Router();

//Add categories
router.post("/addcategory", CategoryController.addCategory);
//get all categories
router.get("/getallcategory", CategoryController.allCategories);

//get category by id
router.get("/getcategory/:id", CategoryController.getCategory);

//update category
router.put("/updatecategory/:id", CategoryController.updateCategory);

//delete category
router.delete("/deletecategory/:id", CategoryController.deleteCategory);

module.exports = router;
