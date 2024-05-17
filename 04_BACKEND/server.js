const mongoose = require("mongoose");
require('dotenv').config()

/** Asynchronous function to connect to the database
 * @returns {boolean} true if connection was successful, false otherwise
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true
  } catch (err) {
    console.log(`MongoDB connection failed: ${err}`);
    return false
  }
};

module.exports = connectDB;
