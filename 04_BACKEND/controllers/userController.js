const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../model/userModel");
const crypto = require("crypto");
require("dotenv").config({ path: "./04_BACKEND/.env" });

const {
  sendPasswordResetEmail,
  sendRegistrationEmail,
} = require("../services/emailService");

const {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateLastName,
  validateMobile,
  validateCity,
} = require("./utilities/validators");

let isDebuggingOn = process.env.DEBUGGING_ON === "false" ? false : true;

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

  /** Controller function to register user.
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *  422 when validation failure happens,
   *  409 when registration is incomplete
   *  403 when registration attempted on already registered email
   *  500 when unknown error occurs
   *  201 when registration successful
   */
  static async registerUser(req, res) {
    // getting all the user parameters from the request object
    const { email, password, firstName, lastName, phone, roles, city } =
      req.body;

    // starting validation on the backend
    isDebuggingOn
      ? console.log(
          "Request params recieved email, password, firstName, lastName, phone, roles, city: ",
          email,
          password,
          firstName,
          lastName,
          phone,
          roles,
          city
        )
      : " ";
    const validationResponses = {
      emailResponse: validateEmail(email),
      passwordResponse: validatePassword(password),
      firstNameResponse: validateFirstName(firstName),
      lastNameResponse: validateLastName(lastName),
      phoneResponse: validateMobile(phone),
      cityResponse: validateCity(city),
    };

    // checking each of the validation responses
    let returnMessage = "";
    let isValidationFail = false;
    for (const key in validationResponses) {
      let value = validationResponses[key];
      if (value !== null) {
        // adding the validation failure message to final return message if found
        returnMessage += value.message + " ";
        isValidationFail = true;
      }
    }

    if (isValidationFail) {
      // return a 422 status code when validation failure occurs
      return res.status(422).json({ errors: returnMessage });
    }

    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email });

      // if exising User found by email
      if (existingUser) {
        if (existingUser.confirmEmailToken !== null) {
          // if user has not finished confirming email
          // return a 409 status code when user needs to confirm email yet
          return res.status(409).json({
            errors:
              "User needs to click on link sent on email to confirm email.",
          });
        } else {
          // if user has already FINISHED registration
          // return a 403 status code when user cannot register again with same email
          return res.status(403).send("Email already exists, sign in instead.");
        }
      }

      // this is a new email trying to register

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const confirmEmailToken = crypto.randomBytes(20).toString("hex");

      // Create a new user with the hashed password
      const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        roles,
        city,
        confirmEmailToken,
      });

      // try sending an email with the token
      await sendRegistrationEmail(email, confirmEmailToken);

      // try saving the new user details if email sent was successful
      await newUser.save();

      res.status(201).send();
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

  /** Controller function to forget password.
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *  404 when User not found,
   *  422 when validation failed,
   *  200 when Password reset link sent,
   *  500 when Internal Server error occurs
   */
  static async forgetPassword(req, res) {
    //Getting email from the request object
    const { email } = req.body;

    // starting validation on the backend
    isDebuggingOn ? console.log("Request params recieved email: ", email) : " ";

    const validationResponses = validateEmail(email);
    console.log(validationResponses);
    // checking the validation responses
    if (validationResponses !== null) {
      return res.status(422).json({ errors: validationResponses?.message });
    }

    try {
      // check if email exists
      const user = await User.findOne({ email });

      // If email not found
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // if email found we generate token and save it to DB with an expiry of 1 hour
      const token = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // Expires in 1 hour
      await user.save();
      console.log(token);

      // sending reset link to email
      await sendPasswordResetEmail(user.email, token);
      res.status(200).json({ error: "Password reset link sent" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /** Controller function to reset password.
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *  422 when validation failure happens,
   *  401 when Invalid or expired token,
   *  400 when password is same as previous one used,
   *  500 when unknown error occurs,
   *  200 when reset successful
   */
  static async resetPassword(req, res) {
    // getting all the user parameters from the request object
    const { token, newPassword } = req.body;

    // starting validation on the backend
    isDebuggingOn
      ? console.log("Request params recieved password: ", newPassword)
      : " ";

    const validationResponses = validatePassword(newPassword);
    console.log(validationResponses);
    // checking the validation responses
    if (validationResponses !== null) {
      return res.status(422).json({ errors: validationResponses?.message });
    }

    try {
      // check if token exists in DB
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      console.log(user);

      // if token not found
      if (!user) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(newPassword, user.password);

      if (passwordMatch) {
        return res.status(400).json({
          error: "New password must be different from the previous password",
        });
      }

      // If new password is differnet from previous one  ,create new password in DB
      // Hashing the password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      // Clearing the token from DB
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
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
