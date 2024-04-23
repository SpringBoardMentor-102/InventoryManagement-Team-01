const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const { validationResult } = require("express-validator");
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../services/emailService');

class userContoller {
  static async loginUser(req, res) {
    const { email, password } = req.body;

    //Doing validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Find the user with the provided email
      const user = await User.findOne({ email });

      // If user not found, return error
      if (!user) {
        return res.status(401).send("Invalid email or password");
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).send("Invalid email or password");
      }

      // Password is correct, generate JWT token
      const token = generateJWT(user);

      // Send the token in response
      return res.status(201).json({ token });

    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

  static async registerUser(req, res) {
    const { email, password, firstName, lastName, phone, roles, city } =
      req.body;
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).send("Email already exists");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with the hashed password
      const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        roles,
        city,
      });

      await newUser.save();
      const token = generateJWT(newUser);

      // Send the token in response
      res.status(201).json({ token });

    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

  static async forgetPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).send('User not found');
      }

      const token = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // Expires in 1 hour
      await user.save();

      await sendPasswordResetEmail(user.email, token);

      res.status(200).send('Password reset link sent');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

  static async resetPassword(req, res) {
    const { token, newPassword } = req.body;

    try {
      const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

      if (!user) {
        return res.status(401).send('Invalid or expired token');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.status(200).send('Password reset successful');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
}

function generateJWT(user) {
  const payload = {
    user: {
      id: user.id,
      email: user.email,
      roles: user.roles,
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h", // Token expires in 24 hours
  });

  return token;
}

module.exports = userContoller;
