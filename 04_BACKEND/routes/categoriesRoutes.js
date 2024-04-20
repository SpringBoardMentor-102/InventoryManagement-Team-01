const CategoryContoller = require("../controllers/CategoryController.js");
const Router = require("express");
const router = Router();

//Add categories
router.post("/addcategory", CategoryContoller.addCategory);
//get all categories
router.get("/getallcategory", CategoryContoller.allCategories);

//get category by id
router.get("/getcategory/:id", CategoryContoller.getCategory);

//update category
router.put("/updatecategory/:id", CategoryContoller.updateCategory);

//delete category
router.delete("/deletecategory/:id", CategoryContoller.deleteCategory);

module.exports = router;
