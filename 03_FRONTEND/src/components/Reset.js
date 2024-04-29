// external dependencies
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//internal dependencies
import {
  validateConfirmPassword,
  validatePassword,
} from "../utilities/validators";

// getting the path from environment variable
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

/** React component, representing the reset-password view of the application
 */
const Reset = () => {
  // declared the naviagtion hook
  const navigate = useNavigate();

  // declaring the state variables
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setconfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

  /** This is a helper function to clear all the errors on the UI screen
   */
  const clearErrors = () => {
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
  const handleReset = async (event) => {
    event.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      console.log("form validation fails.");
      return;
    }

    // taking token from URL Params
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log(token);

    axios
      .post(`${BACKEND_URL}/users/reset-password`, {
        token: token,
        newPassword: password,
      })
      .then((response) => {
        console.log(response.data);
        alert("Password reset successfully");
        setPasswordResetSuccess(true);
        // navigate("/dashboard");
      })
      .catch((error) => {
        let response = error.response;
        console.log(response.status);

        if (response.status === 422) {
          // 422 when validation failure happens,
          console.error("Validation failure: ", response.data.errors);
          setPasswordError("Validation failure: ", response.data.errors);
        } else if (response.status === 401) {
          // 401 when Invalid or expired token
          console.error("Invalid or expired token", response.data.errors);
          setPasswordError("Invalid or expired token", response.data.errors);
        } else if (response.status === 500) {
          // 500 when unknown error occurs
          console.error("Internal Server Error", response.data.errors);
          setPasswordError("Internal Server Error", response.data.errors);
        } else if (response.status === 400) {
          // 500 when unknown error occurs
          console.error("Password Match", response.data.errors);
          setPasswordError(
            "New password must be different from the previous password",
            response.data.errors
          );
        } else {
          // UNKOWN CASE
          console.error("CRAZY STUFF", response.data.errors);
          setPasswordError("CRAZY STUFF", response.data.errors);
        }
      });
  };

  return (
    <>
      <div className="container">
        <h1>Reset Password</h1>
        <p>Please create a new password that you don't use on any other.</p>

        <form id="form" action="/">
          <div className="input-control">
            <label htmlFor="new-password">New Password</label>
            <input
              id="new-password"
              name="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div id="passwordError" className="error_sign_up">
              {passwordError}
            </div>
          </div>
          <div className="input-control">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              name="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            <div id="confirmPasswordError" className="error_sign_up">
              {confirmPasswordError}
            </div>
          </div>

          <input
            className="submit-button"
            type="button"
            value="Submit"
            onClick={handleReset}
          />
            {passwordResetSuccess && ( 
            <button className="login-button" onClick={() => navigate("/signin")}>
              Continue To Login
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Reset;
