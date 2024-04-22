// this are the controllers make your own controllers and use that one like how it is done here
// Understand the flow of code

const Category = require("../model/categories.js");
class CategoryContoller {
  static async addCategory(req, res) {
    try {
      console.log(req.body);
      if (req.body.categoryName) {
        const name = await Category.findOne({
          categoryName: req.body.categoryName,
        });
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

  static async updateCategory(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).send("Invalid Category Id");
      } else {
        const name = await Category.findOne({
          categoryName: req.body.categoryName?.toLowerCase(),
        });
        console.log(name);
        if (name) {
          return res.status(409).send("Name Already exist");
        } else {
          await Category.findByIdAndUpdate(req.params.id, {
            categoryName: req.body.categoryName,
          });
          return res.status(200).send("Updated succesfully");
        }
      }
    } catch (error) {
      return res.status(500).send("Internal Server Error");
      console.log(error);
    }
  }

  static async deleteCategory(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).send("Invalid Category Id");
      } else {
        await Category.deleteOne({ _id: req.params.id });
        return res.status(200).send("Successfully deleted");
      }
    } catch (error) {
      return res.status(500).send("Server Error");
    }
  }
}

module.exports = CategoryContoller;
