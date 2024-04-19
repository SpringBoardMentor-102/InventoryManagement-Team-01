//import mongoose from "mongoose";
const mongoose = require('mongoose');
//Schema of Categories

var categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
    unique: true,
    lowercase: true,
  },
});

//create your schema here

//Export the models
const Category = mongoose.model("category", categorySchema);

//example export {category, transcation .....so on}
//export { Category };
module.exports = Category;