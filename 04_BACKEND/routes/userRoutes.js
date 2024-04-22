const express = require("express");
const userContoller = require("../controllers/userController");
const verifyToken = require("../middleware/auth"); 
const router = express.Router();

router.post("/login", userContoller.loginUser);

router.post("/register", userContoller.registerUser);

router.get("/protectedRoute", verifyToken, (req, res) => {
    res.json({ msg: "This route is protected!" });
  });

module.exports = router;
