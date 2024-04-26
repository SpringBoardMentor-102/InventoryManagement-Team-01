const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/auth");
const router = express.Router();
const path = require("path");
const User = require("../model/userModel");

router.post("/login", userController.loginUser);

router.post("/register", userController.registerUser);

router.post("/forget-password", userController.forgetPassword);
router.post("/reset-password", userController.resetPassword);

// router.get("/reset-password", (req, res) => {
//   try {
//     const token = req.query.token; // Get the token from the query parameters
//     if (!token) {
//       return res.status(400).send("Token is required");
//     }
//     res.sendFile(filePath);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

router.get("/protectedRoute", verifyToken, (req, res) => {
  res.json({ msg: "This route is protected!" });
});

router.post("/check-email", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    // If user not found, return response with exists as false
    if (!user) {
      return res.status(200).json({ exists: false });
    }

    // If user found, return response with exists as true
    res.status(200).json({ exists: true });
  } catch (error) {
    console.error("Email check error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
