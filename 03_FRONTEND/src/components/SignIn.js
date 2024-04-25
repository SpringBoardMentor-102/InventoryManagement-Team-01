import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
  //changes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage]=useState('');
  useEffect(() => {
    const form = document.getElementById("form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    // const submitButton = document.getElementById("submit-btn");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      validateInputs();
    });

    const setError = (element, message) => {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector(".error");

      errorDisplay.innerText = message;
      inputControl.classList.add("error");
      inputControl.classList.remove("success");
    };

    const setSuccess = (element) => {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector(".error");

      errorDisplay.innerText = "";
      inputControl.classList.add("success");
      inputControl.classList.remove("error");
    };

    const isValidEmail = (email) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    const validateInputs = () => {
      let hasErrors = false;

      const emailValue = email.value.trim();
      const passwordValue = password.value.trim();

      if (emailValue === "") {
        setError(email, "Email is required");
        hasErrors = true;
        return;
      } else if (!isValidEmail(emailValue)) {
        setError(email, "Please enter a valid email address");
        hasErrors = true;
        return;
      } else {
        setSuccess(email);
      }

      if (passwordValue === "") {
        setError(password, "Password is required");
        hasErrors = true;
      } else if (passwordValue.length < 8) {
        setError(password, "Password must be at least 8 characters");
        hasErrors = true;
      } else {
        setSuccess(password);
      }

      // if (!hasErrors) {
      //   window.location.href = "/Dashboard"; // Redirect to a blank page
      // }
    };

    // Clear error messages and styles on input focus
    email.addEventListener("focus", () => {
      setSuccess(email);
    });

    password.addEventListener("focus", () => {
      setSuccess(password);
    });

    document
      .getElementById("themeToggle")
      .addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
      });
  }, []);

  //changes
  const onLogin = async () => {
    await axios
      .post("http://localhost:5000/api/users/login", {
        email: email,
        password: password,
      })
      .then(
        (res) => {
          window.location.href = "/Dashboard";
        },
        (e) => {
          if(email !=='' &&password !==''){
            setErrorMessage("Please enter the vaild Credentials");
          }
        }
      );
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
        <div style={{fontSize:"12px", color: "red"}}>{errorMessage}</div>
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
            <div className="error"></div>
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
            <div className="error"></div>
          </div>
  
          <button type="submit" onClick={() => onLogin()}>
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
