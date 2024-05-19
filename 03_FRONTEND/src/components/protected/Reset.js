import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataUnprotected } from "../../utilities/apputils";

//internal dependencies
import {
  validateConfirmPassword,
  validatePassword,
} from "../../utilities/validators";

const Reset = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const clearErrors = () => {
    setPasswordError("");
    setConfirmPasswordError("");
  };

  const validateForm = () => {
    let isValid = true;
    clearErrors();
    let result = null;
    result = validatePassword(password);
    if (result !== null) {
      isValid = false;
      setPasswordError(result.message);
    }
    result = validateConfirmPassword(confirmPassword, password);
    if (result !== null) {
      isValid = false;
      setConfirmPasswordError(result.message);
    }
    return isValid;
  };

  const handleReset = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      console.log("form validation fails.");
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log(token);

    try {
      const response = await fetchDataUnprotected(
        "post",
        "users/reset-password",
        {
          token: token,
          newPassword: password,
        }
      );

      console.log(response.data);
      alert("Password reset successfully");
      setPasswordResetSuccess(true);
      // navigate("/dashboard");
    } catch (error) {
      let response = error.response;
      if (response) {
        console.log(response?.status);
        if (response?.status === 422) {
          console.error("Validation failure: ", response.data.errors);
          setErrorMessage("Validation failure: ", response.data.errors);
        } else if (response?.status === 401) {
          console.error("Invalid or expired token", response.data.errors);
          setErrorMessage("Invalid or expired token", response.data.errors);
        } else if (response?.status === 500) {
          console.error("Internal Server Error", response.data.errors);
          setErrorMessage("Internal Server Error", response.data.errors);
        } else if (response?.status === 400) {
          console.error("Password Match", response.data.errors);
          setErrorMessage(
            "New password must be different from the previous password",
            response.data.errors
          );
        } else {
          console.error("CRAZY STUFF", response.data.errors);
          setErrorMessage("CRAZY STUFF", response.data.errors);
        }
      } else {
        console.log("Backend not working");
        setErrorMessage("Internal Server Error");
      }
    }
  };

  return (
    <>
      <div className="container">
        <h1>Reset Password</h1>
        <p>Please create a new password that you don't use on any other.</p>

        <form id="form" action="/">
          <div style={{ fontSize: "12px", color: "red" }}>{errorMessage}</div>
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
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <button
              className="login-button"
              onClick={() => navigate("/signin")}
            >
              Continue To Login
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Reset;
