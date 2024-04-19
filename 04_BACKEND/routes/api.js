import CategoryContoller from "../controllers/CategoryController.js";
import { Router } from "express";

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

export default router;
