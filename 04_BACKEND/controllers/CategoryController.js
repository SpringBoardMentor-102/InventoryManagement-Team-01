

const Category = require("../model/categories.js");
class CategoryController {
  static async addCategory(req, res) {
    try {
      console.log(req.body);
      if (req.body.categoryName) {
        const name = await Category.findOne({
          categoryName: req.body.categoryName,
        });
        if (!req.body.categoryName) {
          return res.status(400).send("Category name cannot be empty");
        }
        if (name) {
          return res.status(409).send("Category already exist");
        } else {
          try {
            await Category.create({
              categoryName: req.body.categoryName,
            });
            return res.status(200).send("succesfully Added");
          } catch (error) {
            return res.status(400).send("Something Went Wrong");
            console.log(error);
          }
        }
      } else {
        return res.status(400).send("Incomplete Data");
      }
    } catch (error) {
      return res.status(500).send("Internal Server Error");
      console.log(error);
    }
  }

  static async allCategories(req, res) {
    try {
      const categories = await Category.find();
      if (categories.length == 0) {
        return res.status(404).send("No Categories Found Please add one");
      } else {
        return res.status(200).send(categories);
      }
    } catch (error) {
      return res.status(500).send("Server Error");
    }
  }

  static async getCategory(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).send("Invalid Category Id");
      } else {
        return res.status(200).send(category);
      }
    } catch (error) {
      return res.status(500).send("Server Error");
    }
  }

  // static async updateCategory(req, res) {
  //   try {
  //     const category = await Category.findById(req.params.id);
  //     if (!category) {
  //       return res.status(404).send("Invalid Category Id");
  //     } else {
  //       const name = await Category.findOne({
  //         categoryName: req.body.categoryName?.toLowerCase(),
  //       });
  //       console.log(name);
  //       if (name) {
  //         return res.status(409).send("Name Already exist");
  //       } else {
  //         await Category.findByIdAndUpdate(req.params.id, {
  //           categoryName: req.body.categoryName,
  //         });
  //         return res.status(200).send("Updated succesfully");
  //       }
  //     }
  //   } catch (error) {
  //     return res.status(500).send("Internal Server Error");
  //     console.log(error);
  //   }
  // }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { categoryName } = req.body;

      // Check if category ID is provided
      if (!id) {
        return res.status(400).send("Category ID is required");
      }

      // Check if category with provided ID exists
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).send("Category not found");
      }

      // Check if categoryName is provided and not empty
      if (!categoryName) {
        return res.status(400).send("Category name cannot be empty");
      }

      // Check if category with updated name already exists
      const existingCategory = await Category.findOne({
        categoryName: categoryName.toLowerCase(),
        _id: { $ne: id }, // Exclude current category from check
      });
      if (existingCategory) {
        return res.status(409).send("Category name already exists");
      }

      // Update category with new name
      category.categoryName = categoryName;
      await category.save();

      return res.status(200).send("Category updated successfully");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }

  // static async deleteCategory(req, res) {
  //   try {
  //     const category = await Category.findById(req.params.id);
  //     if (!category) {
  //       return res.status(404).send("Invalid Category Id");
  //     } else {
  //       await Category.deleteOne({ _id: req.params.id });
  //       return res.status(200).send("Successfully deleted");
  //     }
  //   } catch (error) {
  //     return res.status(500).send("Server Error");
  //   }
  // }

  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      // Check if category ID is provided
      if (!id) {
        return res.status(400).send("Category ID is required");
      }

      // Check if category with provided ID exists
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).send("Category not found");
      }

      // Delete the category
      await Category.deleteOne({ _id: id });

      return res.status(200).send("Category deleted successfully");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }

  static async getCategoriesByName(req, res) {
    try {
      const { categoryName } = req.query;
      if (!categoryName) {
        return res.status(400).send("Category name is required");
      }

      const categories = await Category.find({
        categoryName: { $regex: new RegExp(categoryName, "i") },
      });

      if (categories.length === 0) {
        return res.status(404).send("No categories found with the given name");
      }

      return res.status(200).send(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }

}

module.exports = CategoryController;
