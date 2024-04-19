const express = require('express');
const bodyParser = require('body-parser');
const config = require('dotenv/config');
const mongoose = require('mongoose');
// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import "dotenv/config";
const router = require("./routes/api.js");
//import router from "./routes/api.js";
const checkouts = require("./routes/checkoutRoutes.js");
const connectDB = require("./server.js");
connectDB();

//app.use(bodyParser.json());

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/checkout", checkouts);
app.use("/api", router);

    const PORT = process.env.PORT || 5000;
    
    app.listen(
      PORT,
      console.log(`Server running on port ${PORT}`)
    );

// const PORT = process.env.PORT || 3000;

// // Connecting  MongoDB at default port 27017.
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("mongo connected");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
