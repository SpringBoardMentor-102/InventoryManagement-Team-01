import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Connecting  MongoDB at default port 27017.
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongo connected");
  })
  .catch((error) => {
    console.log(error);
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//using routes folder
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
