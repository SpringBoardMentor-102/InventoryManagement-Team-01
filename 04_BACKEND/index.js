const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const config = require("dotenv/config");
require("dotenv").config({ path: "./04_BACKEND/.env" });
const mongoose = require("mongoose");

const categories = require("./routes/categoriesRoutes.js");
const checkouts = require("./routes/checkoutRoutes.js");
const connectDB = require("./server.js");
const users = require("./routes/userRoutes.js");
const transactions = require("./routes/transactionRoutes.js");
const products = require("./routes/productRoutes.js");
const searchs = require("./routes/searchs.js")
// const emailVerificationRoutes = require("./routes/emailVerificationRoutes");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", users);
app.use("/api/checkout", checkouts);
app.use("/api/category", categories);
app.use("/api/transaction", transactions);
app.use("/api/product", products);
app.use("/api/search",searchs);
// app.use("/api", emailVerificationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
