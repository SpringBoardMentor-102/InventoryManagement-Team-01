const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const { validationResult } = require("express-validator");

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
      // Password is correct, log the user in
      return res.status(201).send("Login succesfully");
      //   res.redirect("/dashboard"); // Redirect to the dashboard page
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
      res.status(201).send("user regesitered succesfully"); // Redirect to the login page after registration
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = userContoller;
