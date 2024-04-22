const express = require("express");
const userContoller = require("../controllers/userController");
const { loginSchema, registerSchema } = require("../utils/validator");
const router = express.Router();

router.post("/login", loginSchema, userContoller.loginUser);

router.post("/register", registerSchema, userContoller.registerUser);

module.exports = router;
