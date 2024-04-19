// import CategoryContoller from "../controllers/CategoryController.js";
// import { Router } from "express";
const CategoryContoller = require("../controllers/CategoryController.js");
const Router = require("express");
const router = Router();

//Add categories
router.post("/categories", CategoryContoller.addCategory);
//get all categories
router.get("/categories", CategoryContoller.allCategories);

//get category by id
router.get("/categories/:id", CategoryContoller.getCategory);

//update category
router.put("/categories/:id", CategoryContoller.updateCategory);

//delete category
router.delete("/categories/:id", CategoryContoller.deleteCategory);

module.exports = router;
