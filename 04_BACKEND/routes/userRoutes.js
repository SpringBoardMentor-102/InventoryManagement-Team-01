const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth');
const router = express.Router();
const User = require('../model/userModel');

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/confirm-email', userController.confirmEmail);

router.post('/forget-password', userController.forgetPassword);
router.post('/reset-password', userController.resetPassword);

// router.get("/protectedRoute", verifyToken, (req, res) => {
//   res.json({ msg: "This route is protected!" });
// });

// router.post("/check-email", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(200).json({ exists: false });
//     }

//     res.status(200).json({ exists: true });
//   } catch (error) {
//     console.error("Email check error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

module.exports = router;
