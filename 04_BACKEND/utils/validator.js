const { body } = require("express-validator");

const loginSchema = [
  body("email")
    .isEmail()
    .withMessage("Please enter valid email")
    .notEmpty()
    .withMessage("Please enter emaiil"),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Min 6 character required")
    .isLength({ max: 50 })
    .withMessage("max 50 charcters only"),
];
const registerSchema = [
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Please enter valid email")
    .notEmpty()
    .withMessage("Please enter emaiil"),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Min 6 character required")
    .isLength({ max: 50 })
    .withMessage("Max 50 charcters only"),
  body("firstName")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("Min 8 character required")
    .isLength({ max: 50 })
    .withMessage("Max 50 charcters only"),
  body("lastName")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("Min 8 character required")
    .isLength({ max: 50 })
    .withMessage("Max 50 charcters only"),
  body("phone")
    .notEmpty()
    .isNumeric()
    .withMessage("only number are allowed")
    .isLength({ min: 10 })
    .withMessage("Min 10 numbers required")
    .isLength({ max: 12 })
    .withMessage("Max 12 numbers required"),
  body("roles")
    .notEmpty()
    .isInt({
      lt: 3,
      gt: -1,
    })
    .withMessage("only numbers are allowed between 0 and 2"),
];

module.exports = { loginSchema, registerSchema };
