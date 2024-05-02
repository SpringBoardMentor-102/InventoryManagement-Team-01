const FN_REQUIRED = "FN_REQUIRED";
const FN_INVALID_CHARACTERS = "FN_INVALID_CHARACTERS";
const FN_INVALID_LENGTH = "FN_INVALID_LENGTH";

const LN_REQUIRED = "LN_REQUIRED";
const LN_INVALID_CHARACTERS = "LN_INVALID_CHARACTERS";
const LN_INVALID_LENGTH = "LN_INVALID_LENGTH";

const CITY_REQUIRED = "CITY_REQUIRED";
const CITY_INVALID_LENGTH = "CITY_INVALID_LENGTH";

const EMAIL_REQUIRED = "EMAIL_REQUIRED";
const EMAIL_INVALID_FORMAT = "EMAIL_INVALID_FORMAT";

const MOBILE_REQUIRED = "MOBILE_REQUIRED";
const MOBILE_INVALID_FORMAT = "MOBILE_INVALID_FORMAT";

const PASSWORD_REQUIRED = "PASSWORD_REQUIRED";
const PASSWORD_INVALID_FORMAT = "PASSWORD_INVALID_FORMAT";

const CONFIRM_REQUIRED = "CONFIRM_REQUIRED";
const CONFIRM_MISMATCH = "CONFIRM_MISMATCH";

const DESCRIPTION_REQUIRED = "DESCRIPTION_REQUIRED";
const DESCRIPTION_INVALID_LENGTH = "DESCRIPTION_INVALID_LENGTH";

const PRICE_REQUIRED = "PRICE_REQUIRED";
const PRICE_INVALID_FORMAT = "PRICE_INVALID_FORMAT";

const QUANTITY_REQUIRED = "QUANTITY_REQUIRED";
const QUANTITY_INVALID_FORMAT = "QUANTITY_INVALID_FORMAT";

const STATUS_REQUIRED = "STATUS_REQUIRED";

const CATEGORY_ID_REQUIRED = "CATEGORY_ID_REQUIRED";

const IMAGE_URL_REQUIRED = "IMAGE_URL_REQUIRED";
const IMAGE_URL_INVALID_FORMAT = "IMAGE_URL_INVALID_FORMAT";

/** Validator function for validating first name
 * 
 * @param {*} firstName 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateFirstName(firstName) {
  if (!firstName || firstName.trim() === "") {
    return { message: "First name is required.", code: FN_REQUIRED };
  }
  if (!/^[a-zA-Z]+$/.test(firstName)) {
    return { message: "First name can only contain letters.", code: FN_INVALID_CHARACTERS };
  }
  if (firstName.length < 2 || firstName.length > 30) {
    return { message: "First name must be between 2 and 30 characters.", code: FN_INVALID_LENGTH };
  }
  return null; // No errors
}

/** Validator function for validating last name
 * 
 * @param {*} lastName 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateLastName(lastName) {
  if (!lastName || lastName.trim() === "") {
    return { message: "Last name is required.", code: LN_REQUIRED };
  }
  if (!/^[a-zA-Z]+$/.test(lastName)) {
    return { message: "Last name can only contain letters.", code: LN_INVALID_CHARACTERS };
  }
  if (lastName.length < 2 || lastName.length > 30) {
    return { message: "Last name must be between 2 and 30 characters.", code: LN_INVALID_LENGTH };
  }
  return null;
}

/** Validator function for validating city parameter
 * 
 * @param {*} city 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateCity(city) {
  if (!city || city.trim() === "") {
    return { message: "City is required.", code: CITY_REQUIRED };
  }
  if (city.length < 2 || city.length > 50) {
    return { message: "City must be between 2 and 50 characters.", code: CITY_INVALID_LENGTH };
  }
  return null;
}

/** Validator function for validating email ID
 * 
 * @param {*} email 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateEmail(email) {
  if (!email || email.trim() === "") {
    return { message: "Email is required.", code: EMAIL_REQUIRED };
  }
  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { message: "Invalid email format.", code: EMAIL_INVALID_FORMAT };
  }
  return null;
}

/** Validator function for validating mobile number
 * 
 * @param {*} mobile 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateMobile(mobile) {
  if (!mobile || mobile.trim() === "") {
    return { message: "Mobile number is required.", code: MOBILE_REQUIRED };
  }
	
  const mobileRegex = /^\d{10}$/; // Allows 10 digits
  if (!mobileRegex.test(mobile)) {
    return { message: "Invalid mobile number format.", code: MOBILE_INVALID_FORMAT };
  }
  return null;
}

/** Validator function for validating password
 * 
 * @param {*} password 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validatePassword(password) {
  if (!password || password.trim() === "") {
    return { message: "Password is required.", code: PASSWORD_REQUIRED };
  }
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])([^\s]){6,20}$/;
  if (!passwordRegex.test(password)) {
    return {
      message:
        "Password must be between 6 and 20 characters, and contain at least one uppercase letter, lowercase letter, number, and special character.",
      code: PASSWORD_INVALID_FORMAT,
    };
  }
  return null;
}

/** Validator function for validating confirm password
 * 
 * @param {*} confirmPassword
 * @param {*} password 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateConfirmPassword(confirmPassword, password) {
  if (!confirmPassword || confirmPassword.trim() === "") {
    return { message: "Confirm password is required.", code: CONFIRM_REQUIRED };
  }
  if (confirmPassword !== password) {
    return { message: "Passwords do not match.", code: CONFIRM_MISMATCH };
  }
  return null;
}

/** Validator function for validating description
 * 
 * @param {*} description 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateDescription(description) {
  if (!description || description.trim() === "") {
    return { message: "Description is required.", code: DESCRIPTION_REQUIRED };
  }
  // validation for description length
  if (description.length < 2 || description.length > 255) {
    return { message: "Description must be between 2 and 255 characters.", code: DESCRIPTION_INVALID_LENGTH };
  }
  return null;
}

/** Validator function for validating price
 * 
 * @param {*} price 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validatePrice(price) {
  if (!price || price.trim() === "") {
    return { message: "Price is required.", code: PRICE_REQUIRED };
  }
  // validation for price format 
  if (isNaN(parseFloat(price)) || !isFinite(price)) {
    return { message: "Invalid price format.", code: PRICE_INVALID_FORMAT };
  }
  // Check if the price is negative
  if (parseFloat(price) < 0) {
    return { message: "Price cannot be negative.", code: PRICE_NEGATIVE_VALUE };
  }
  return null;
}

/** Validator function for validating quantity
 * 
 * @param {*} quantity 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateQuantity(quantity) {
  if (!quantity || quantity.trim() === "") {
    return { message: "Quantity is required.", code: QUANTITY_REQUIRED };
  }
  // validation for quantity format 
  if (!Number.isInteger(Number(quantity))) {
    return { message: "Invalid quantity format.", code: QUANTITY_INVALID_FORMAT };
  }
  return null;
}

/** Validator function for validating status
 * 
 * @param {*} status 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateStatus(status) {
  if (!status || status.trim() === "") {
    return { message: "Status is required.", code: STATUS_REQUIRED };
  }
  // Specific validation for status values
  if (!["0", "1"].includes(status)) {
    return { message: "Invalid status value. Status must be 0 (Available), 1 (Out_Of_Stock).", code: STATUS_INVALID_VALUE };
  }
  return null;
}

/** Validator function for validating category Id
 * 
 * @param {*} categoryId 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateCategoryId(categoryId) {
  if (!categoryId || categoryId.trim() === "") {
    return { message: "Category ID is required.", code: CATEGORY_ID_REQUIRED };
  }
  // validation for category ID format
  const categoryIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!categoryIdRegex.test(categoryId)) {
    return { message: "Invalid category ID format.", code: CATEGORY_ID_INVALID_FORMAT };
  }
  return null;
}

module.exports = {
  validateFirstName,
  validateLastName,
  validateCity,
  validateEmail,
  validateMobile,
  validatePassword,
  validateConfirmPassword,
  validateDescription,
  validatePrice,
  validateQuantity,
  validateStatus,
  validateCategoryId
}
