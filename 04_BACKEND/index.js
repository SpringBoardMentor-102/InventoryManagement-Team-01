const express = require("express");
const bodyParser = require("body-parser");
const config = require("dotenv/config");
const mongoose = require("mongoose");

const categories = require("./routes/categoriesRoutes.js");
const checkouts = require("./routes/checkoutRoutes.js");
const connectDB = require("./server.js");
connectDB();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/checkout", checkouts);
app.use("/api/category", categories);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
