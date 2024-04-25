// external dependencies
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


// internal dependencies: styling
import "../../src/index.css";
import { validateCity, validateConfirmPassword, validateEmail, validateFirstName, validateLastName, validateMobile, validatePassword } from "../utilities/validators";

/** React component, representing the Sign-up view of the application
 */
const SignUp = () => {

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
  }

  /** Helper function to validate the input sent by the user
   * 
   * @returns {Boolean} true if validation is success, false otherwise
   */
  const validateForm = () => {
    let isValid = true;

    // Clear previous error messages
    clearErrors();

    let result = null

    // validating the first name
    result = validateFirstName(firstName);
    if (result !== null) {
      let isValid = false;
      setFirstnameError(result.message)
    }

    // validating the last name
    result = validateLastName(lastName);
    if (result !== null) {
      let isValid = false;
      setLastnameError(result.message)
    }
    
    // validating the city parameter
    result = validateCity(city);
    if (result !== null) {
      let isValid = false;
      setCityError(result.message)
    }

    // validating email
    result = validateEmail(email);
    if (result !== null) {
      let isValid = false;
      setEmailError(result.message)
    }

    // validating the  mobile number
    result = validateMobile(mobile);
    if (result !== null) {
      let isValid = false;
      setMobileError(result.message)
    }

    // validating the password
    result = validatePassword(password);
    if (result !== null) {
      let isValid = false;
      setPasswordError(result.message)
    }
    
    // validating the confirm password
    result = validateConfirmPassword(confirmPassword);
    if (result !== null) {
      let isValid = false;
      setConfirmPasswordError(result.message)
    }

    return isValid;
  }
  
  /** Event handler for doing the user submit click
   * @param {*} event 
   */
  async function signUp(event) {

    // do not propagate the event
    event.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      return;
    }

    // API call to register user
    await axios
      .post("http://localhost:5000/api/users/register", {
        firstName: firstName,
        lastName: lastName,
        city: city,
        email: email,
        phone: mobile,
        password: password,
        roles: 0,
      })
      .then((response) => {
        // this is a success response
        
        // if (response.status === 200)

        // check if status code is 200, 201 whatever is the right one
        //      in case login was successful redirect to dashbboard
        //      before navigating to the dashboard remember the JWT token received!!
        //      navigate("/dashboard");
        //      navigate("/dashboard");
        //      navigate("/dashboard");
        //      navigate("/dashboard");
        //      navigate("/dashboard");
        
        // if the status code is not 200/201: something went wrong in the registration process
        //      either registration was incomplete: redirect -> check email page
        //      email does not exist: redirect -> dude! email doesnt exist, try again wala page
        //      internal server error: redirect -> unknown error, please try again wala page

        // setIsSignUpSuccess(true);
        // window.location.href = "/Reg_Config"; // TODO: dangerously wrong!!
      })
      .catch((error) => {

        // this is the case when HTTP call itself was failed, response never came
        //      internal server error: redirect -> unknown error, server not responding, page/message
        console.error("Signup error:", error);
        // document.getElementById("nameError").innerText =
        //   "Signup failed. Please try again.";
      });
  }

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
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          value={firstName}
          aria-label="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="off"
        />
        <div id="firstnameError" className="error_sign_up" >{ firstnameError }</div>

        <input
          type="text"
          id="lastName"
          placeholder="Last Name"
          value={lastName}
          aria-label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          autoComplete="off"
        />
        <div id="lastnameError" className="error_sign_up">{ lastnameError }</div>

        <input
          type="text"
          id="city"
          placeholder="City"
          value={city}
          aria-label="City"
          onChange={(e) => setCity(e.target.value)}
          autoComplete="off"
        />
        <div id="cityError" className="error_sign_up">{ cityError }</div>

        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          aria-label="Email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <div id="emailError" className="error_sign_up">{ emailError }</div>

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
        <div id="mobileError" className="error_sign_up">{ mobileError }</div>

        <input
          type="password"
          id="password"
          placeholder="Create Password"
          value={password}
          aria-label="Create Password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <div id="passwordError" className="error_sign_up">{ passwordError }</div>

        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          aria-label="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="off"
        />
        <div id="confirmPasswordError" className="error_sign_up">{ confirmPasswordError }</div>

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
