const express = require("express");
const userContoller = require("../controllers/userController");
const verifyToken = require("../middleware/auth");
const { loginSchema, registerSchema } = require("../utils/validator");
const router = express.Router();
const path = require('path');


router.post("/login", loginSchema, userContoller.loginUser);

router.post("/register", registerSchema, userContoller.registerUser);

router.post('/forget-password', userController.forgetPassword);
router.post('/reset-password', userController.resetPassword);


router.get('/reset-password', (req, res) => {
  try {
      const token = req.query.token; // Get the token from the query parameters
      if (!token) {
          return res.status(400).send('Token is required');
      }
      
      const filePath = path.resolve(__dirname, '..', 'public', 'resetPasswordForm.html');
      console.log(filePath);
      res.sendFile(filePath);

  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

router.get("/protectedRoute", verifyToken, (req, res) => {
  res.json({ msg: "This route is protected!" });
});


module.exports = router;
