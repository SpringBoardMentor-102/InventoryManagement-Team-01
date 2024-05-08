// external dependencies
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Internal dependencies
import { validateEmail, validatePassword } from "../../utilities/validators";

// getting the path from environment variable
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

/** React component, representing the Sign-in view of the application
 */
function SignIn() {
  const navigate = useNavigate();
  // declaring the state variables
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /** This is a helper function to clear all the errors on the UI screen
   */
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
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

    // validating email
    result = validateEmail(email);
    if (result !== null) {
      isValid = false;
      setEmailError(result.message);
    }

    // validating the password
    result = validatePassword(password);
    if (result !== null) {
      isValid = false;
      setPasswordError(result.message);
    }

    return isValid;
  };

  /** Event handler for doing the user submit click
   * @param {*} event
   */
  const onLogin = async (event) => {
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
      .post(`${BACKEND_URL}/users/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Login Succesfull");
        // console.log(response.data.token);
        // Storing token in session storage
        sessionStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        let response = error.response;
        console.log(response?.status);
        if (response) {
          if (response?.status === 422) {
            // 422 when validation failure happens,
            console.error("Validation failure: ", response.data.errors);
            setErrorMessage("Validation failure: ", response.data.errors);
          } else if (response?.status === 401) {
            // 401 when registration is incomplete
            console.error("Incomplete verification", response.data.errors);
            setErrorMessage("Incomplete verification", response.data.errors);
          } else if (response?.status === 403) {
            // 403 when registration attempted on already registered email
            console.error("Invalid email or password", response.data.errors);
            setErrorMessage("Invalid email or password", response.data.errors);
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

  return (
    <>
      <nav className="navbar">
        <div className="navbar-toggle" id="themeToggle">
          <div className="toggle-icon">
            <ion-icon name="toggle"></ion-icon>
          </div>
        </div>
      </nav>

      <div className="container">
        <h1>Sign In</h1>
        <p>Explore this app as a test user:</p>

        <form id="form" action="/">
          <div style={{ fontSize: "12px", color: "red" }}>{errorMessage}</div>
          <div className="input-control">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <div id="emailError" className="error_sign_up">
              {emailError}
            </div>
          </div>
          <div className="input-control">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <div id="passwordError" className="error_sign_up">
              {passwordError}
            </div>
          </div>

          <button type="submit" onClick={onLogin}>
            Sign In
          </button>
          <div className="links" style={{ clear: "both", textAlign: "center" }}>
            <Link to="/signup">Sign Up</Link>
            <Link to="/forgot">Forgot password</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
