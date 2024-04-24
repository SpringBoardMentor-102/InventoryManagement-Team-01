import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../src/index.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [isSignUpSuccess, setIsSignUp] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  async function signUp(event) {
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
        console.log(response.data);
        setIsSignUpSuccess(true);
        window.location.href = "/Reg_Config";
      })
      .catch((error) => {
        console.error("Signup error:", error);
        document.getElementById("nameError").innerText =
          "Signup failed. Please try again.";
      });
  }

  function validateForm() {
    let isValid = true;

    // Clear previous error messages
    clearErrors();

    // Validation for empty fields
    if (firstName.trim() === "" || lastName.trim() === "") {
      document.getElementById("nameError").innerText =
        "First Name and Last Name cannot be empty.";
      isValid = false;
    }

    if (city.trim() === "") {
      document.getElementById("cityError").innerText = "City cannot be empty.";
      isValid = false;
    }

    if (email.trim() === "") {
      document.getElementById("emailError").innerText =
        "Email cannot be empty.";
      isValid = false;
    }

    if (mobile.trim() === "" || !/^\d{10}$/.test(mobile)) {
      document.getElementById("mobileError").innerText =
        "Mobile number should be 10 digits and contain numbers only.";
      isValid = false;
    }

    if (password.trim() === "") {
      document.getElementById("passwordError").innerText =
        "Password cannot be empty.";
      isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_]{6,50}$/.test(
        password
      )
    ) {
      document.getElementById("passwordError").innerText =
        "Password must be alphanumeric, 6-50 characters long, and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
      isValid = false;
    }

    if (confirmPassword.trim() === "") {
      document.getElementById("confirmPasswordError").innerText =
        "Confirm Password cannot be empty.";
      isValid = false;
    }

    if (password !== confirmPassword) {
      document.getElementById("confirmPasswordError").innerText =
        "Passwords do not match.";
      isValid = false;
    }

    return isValid;
  }

  function clearErrors() {
    document.getElementById("nameError").innerText = "";
    document.getElementById("cityError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("mobileError").innerText = "";
    document.getElementById("passwordError").innerText = "";
    document.getElementById("confirmPasswordError").innerText = "";
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
        <input
          type="text"
          id="lastName"
          placeholder="Last Name"
          value={lastName}
          aria-label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          autoComplete="off"
        />
        <div id="nameError" className="error_sign_up"></div>

        <input
          type="text"
          id="city"
          placeholder="City"
          value={city}
          aria-label="City"
          onChange={(e) => setCity(e.target.value)}
          autoComplete="off"
        />
        <div id="cityError" className="error_sign_up"></div>

        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          aria-label="Email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <div id="emailError" className="error_sign_up"></div>

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
        <div id="mobileError" className="error_sign_up"></div>

        <input
          type="password"
          id="password"
          placeholder="Create Password"
          value={password}
          aria-label="Create Password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <div id="passwordError" className="error_sign_up"></div>

        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          aria-label="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="off"
        />
        <div id="confirmPasswordError" className="error_sign_up"></div>

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
