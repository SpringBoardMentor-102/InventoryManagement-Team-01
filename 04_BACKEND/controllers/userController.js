const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

class userContoller {
  static async loginUser(req, res) {
    const { email, password } = req.body;

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

      // // Password is correct, log the user in
      // return res.status(201).send("Login succesfully");

      // Send the token in response
      return res.status(201).json({ token });

      
      //   res.redirect("/dashboard"); // Redirect to the dashboard page
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
  static async registerUser(req, res) {
    const { email, password, firstName, lastName, phone, roles, city } =
      req.body;

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
      // res.status(201).send("user regesitered succesfully"); // Redirect to the login page after registration
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
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

function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
module.exports = userContoller;
