const express = require("express");
const userContoller = require("../controllers/userController");
const verifyToken = require("../middleware/auth");
const { loginSchema, registerSchema } = require("../utils/validator");
const router = express.Router();

router.post("/login", loginSchema, userContoller.loginUser);

router.post("/register", registerSchema, userContoller.registerUser);

router.get("/protectedRoute", verifyToken, (req, res) => {
  res.json({ msg: "This route is protected!" });
});

module.exports = router;
