const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/auth");
const router = express.Router();
const User = require("../model/userModel");

router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.get("/confirm-email", userController.confirmEmail);

router.post("/forget-password", userController.forgetPassword);
router.post("/reset-password", userController.resetPassword);

module.exports = router;
