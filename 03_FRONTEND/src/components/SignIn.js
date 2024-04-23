import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';



function SignIn(){
  useEffect(()=>{
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
    
      if (!hasErrors) {
        window.location.href = '/Dashboard'; // Redirect to a blank page
      }
    };
    
    // Clear error messages and styles on input focus
    email.addEventListener("focus", () => {
      setSuccess(email);
    });
    
    password.addEventListener("focus", () => {
      setSuccess(password);
    });
    
    document.getElementById("themeToggle").addEventListener("click", function() {
      document.body.classList.toggle("dark-mode");
    });
    
},[]);


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
        <div className="input-control">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="text" autoComplete='off'/>
            <div className="error"></div>
        </div>
        <div className="input-control">
            <label htmlFor="password">Password</label>
            <input id="password"name="password" type="password"/>
            <div className="error"></div>
        </div>
      
      <button type="submit">Sign In</button>
      <div className="links" style={{clear: 'both', textAlign: 'center'}}>
        <Link to="/signup">Sign Up</Link>
        <Link to="/forgot">Forgot password</Link>
      </div>
    </form>
    
    
  </div>
    </>
  )
}

export default SignIn
