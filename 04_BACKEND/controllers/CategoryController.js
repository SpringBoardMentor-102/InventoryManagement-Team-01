// dependencies
const Category = require("../model/categories.js");

/** Class containing all the controllers (as methods) for the /category path
 */
class CategoryController {

  /** Controller method to handle adding a new category
   * @param {Object} req the request object recieved from client
   * @param {Object} res the response object to be modified and sent out
   * // TODO: make sure every case returns a different number, 200, 201, 400, 401 etc
   */
  static async addCategory(req, res) {
    try {
      if (req.body.categoryName) {
        const foundCategory = await Category.findOne({
          categoryName: req.body.categoryName,
        });
        if (!req.body.categoryName) {
          return res.status(400).send("Category name cannot be empty");
        }
        if (foundCategory) {
          return res.status(409).send("Category already exist");
        } else {
          try {
            await Category.create({
              categoryName: req.body.categoryName,
            });
            return res.status(200).send("succesfully Added"); 
            // TODO: send the newly created category object also in response
          } catch (error) {
            console.log(error)
            return res.status(400).send("Something Went Wrong");
          }
        }
      } else {
        return res.status(400).send("Category Name is a mandatory field");
      }
    } catch (error) {
      return res.status(500).send("Internal Server Error");
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
