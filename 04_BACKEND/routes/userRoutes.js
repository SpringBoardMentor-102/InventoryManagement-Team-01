const express = require("express");
const userContoller = require("../controllers/userController");
const router = express.Router();

router.post("/login", userContoller.loginUser);

router.post("/register", userContoller.registerUser);

module.exports = router;
