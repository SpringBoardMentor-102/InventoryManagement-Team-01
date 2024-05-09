// external dependencies
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// internal dependencies: styling
import "../../index.css";
import {
  validateCity,
  validateConfirmPassword,
  validateEmail,
  validateFirstName,
  validateLastName,
  validateMobile,
  validatePassword,
} from "../../utilities/validators";

// getting the path from environment variable
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

/** React component, representing the Sign-up view of the application
 */
const SignUp = () => {
  const navigate = useNavigate();

  // declaring the state variables
  const [firstName, setFirstName] = useState("");
  const [firstnameError, setFirstnameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastnameError, setLastnameError] = useState("");

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  // ?? I am not sure what this is!!
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [isSignUpSuccessError, setIsSignUpSuccessError] = useState(false);

  /** This is a helper function to clear all the errors on the UI screen
   */
  const clearErrors = () => {
    setFirstnameError("");
    setLastnameError("");
    setCityError("");
    setEmailError("");
    setMobileError("");
    setPasswordError("");
    setConfirmPasswordError("");
  };

  /** Helper function to validate the input sent by the user
   *
   * @returns {Boolean} true if validation is success, false otherwise
   */
  const validateForm = () => {
    let isValid = true;

    // Clear previous error messages
    clearErrors();

    let result = null;

    // validating the first name
    result = validateFirstName(firstName);
    if (result !== null) {
      isValid = false;
      setFirstnameError(result.message);
    }

    // validating the last name
    result = validateLastName(lastName);
    if (result !== null) {
      isValid = false;
      setLastnameError(result.message);
    }

    // validating the city parameter
    result = validateCity(city);
    if (result !== null) {
      isValid = false;
      setCityError(result.message);
    }

    // validating email
    result = validateEmail(email);
    if (result !== null) {
      isValid = false;
      setEmailError(result.message);
    }

    // validating the  mobile number
    result = validateMobile(mobile);
    if (result !== null) {
      isValid = false;
      setMobileError(result.message);
    }

    // validating the password
    result = validatePassword(password);
    if (result !== null) {
      isValid = false;
      setPasswordError(result.message);
    }

    // validating the confirm password
    result = validateConfirmPassword(password, confirmPassword);
    if (result !== null) {
      isValid = false;
      setConfirmPasswordError(result.message);
    }

    return isValid;
  };

  /** Event handler for doing the user submit click
   * @param {*} event
   */
  const signUp = async (event) => {
    // do not propagate the event
    event.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      console.log("form validation fails.");
      return;
    }

    console.log("making a call..");
    // validation was successful, attempting to make a call to the backend
    await axios
      .post(`${BACKEND_URL}/users/register`, {
        firstName: firstName,
        lastName: lastName,
        city: city,
        email: email,
        phone: mobile,
        password: password,
        roles: 0,
      })
      .then((response) => {
        // registration successful
        console.log("Registration Succesfull");
        //navigate("/dashboard");
        console.log(response);
        alert(
          "Email verification link sent successfully, Please check you mail"
        );
      })
      .catch((error) => {
        let response = error.response;
        console.log(response?.status);
        if (response) {
          if (response?.status === 422) {
            // 422 when validation failure happens,
            console.error("Validation failure: ", response.data.errors);
            setErrorMessage("Validation failure: ", response.data.errors);
          } else if (response?.status === 409) {
            // 409 when registration is incomplete
            navigate("/email_notification");
            console.error("Incomplete registration", response.data.errors);
            setErrorMessage("Incomplete registration", response.data.errors);
          } else if (response?.status === 403) {
            // 403 when registration attempted on already registered email
            console.error("Already registered", response.data.errors);
            setErrorMessage("Already registered", response.data.errors);
          } else if (response?.status === 500) {
            // 500 when unknown error occurs
            console.error("Internal Server Error", response.data.errors);
            setErrorMessage("Internal Server Error", response.data.errors);
          } else {
            // UNKOWN CASE
            console.error("CRAZY STUFF", response.data.errors);
            setErrorMessage("CRAZY STUFF", response.data.errors);
          }
        } else {
          console.log("Backend not working");
          setErrorMessage("Internal Server Error");
        }
      });
  };

  function openGooglePopup() {
    window.open(
      "https://www.google.com",
      "googleLoginWindow",
      "width=600,height=600"
    );
  }

  return (
    <div className="container_sign_up">
      <h2>Sign Up</h2>
      <form id="signupForm" action="/register" onSubmit={signUp}>
        <div style={{ fontSize: "12px", color: "red" }}>{errorMessage}</div>
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          value={firstName}
          aria-label="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="off"
        />
        <div id="firstnameError" className="error_sign_up">
          {firstnameError}
        </div>

        <input
          type="text"
          id="lastName"
          placeholder="Last Name"
          value={lastName}
          aria-label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          autoComplete="off"
        />
        <div id="lastnameError" className="error_sign_up">
          {lastnameError}
        </div>

        <input
          type="text"
          id="city"
          placeholder="City"
          value={city}
          aria-label="City"
          onChange={(e) => setCity(e.target.value)}
          autoComplete="off"
        />
        <div id="cityError" className="error_sign_up">
          {cityError}
        </div>

        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          aria-label="Email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <div id="emailError" className="error_sign_up">
          {emailError}
        </div>

        <input
          type="tel"
          id="mobile"
          placeholder="Mobile Number (10 digits)"
          pattern="[0-9]{10}"
          value={mobile}
          aria-label="Mobile Number"
          onChange={(e) => setMobile(e.target.value)}
          autoComplete="off"
        />
        <div id="mobileError" className="error_sign_up">
          {mobileError}
        </div>

        <input
          type="password"
          id="password"
          placeholder="Create Password"
          value={password}
          aria-label="Create Password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <div id="passwordError" className="error_sign_up">
          {passwordError}
        </div>

        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          aria-label="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="off"
        />
        <div id="confirmPasswordError" className="error_sign_up">
          {confirmPasswordError}
        </div>

        <input type="submit" value="Sign Up" />

        <div className="action-links_sign_up">
          <p>
            Already registered?<Link to="/signin"> Sign In</Link>
          </p>
          <p>
            <button onClick={openGooglePopup} type="button">
              Login with Google
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;