const express = require("express");
const bodyParser = require("body-parser");
const config = require("dotenv/config");
require('dotenv').config({ path: './04_BACKEND/.env' });
const mongoose = require("mongoose");

const categories = require("./routes/categoriesRoutes.js");
const checkouts = require("./routes/checkoutRoutes.js");
const connectDB = require("./server.js");
const users = require("./routes/userRoutes.js");
const transactions = require('./routes/transactionRoutes.js'); 
const products = require("./routes/productRoutes.js");
connectDB();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", users);
app.use("/api/checkout", checkouts);
app.use("/api/category", categories);
app.use('/api/transaction', transactions);
app.use("/api/product", products);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
