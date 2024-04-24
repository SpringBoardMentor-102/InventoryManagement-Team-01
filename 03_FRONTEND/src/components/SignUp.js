import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../src/index.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUpSuccess, setIsSignUp] = useState(false);

  function signUp(event) {
    event.preventDefault();
    
    // Validation for empty fields
    if (firstName.trim() === '' || lastName.trim() === '') {
      document.getElementById('nameError').innerText = "First Name and Last Name cannot be empty.";
      setIsSignUp(false);
    } else {
      document.getElementById('nameError').innerText = "";
    }

    if (city.trim() === '') {
      document.getElementById('cityError').innerText = "City cannot be empty.";
      setIsSignUp(false);
    } else {
      document.getElementById('cityError').innerText = "";
    }

    if (email.trim() === '') {
      document.getElementById('emailError').innerText = "Email cannot be empty.";
      setIsSignUp(false);
    } else {
      document.getElementById('emailError').innerText = "";
    }

    if (mobile.trim() === '' || !/^\d{10}$/.test(mobile)) {
      document.getElementById('mobileError').innerText = "Mobile number should be 10 digits and contain numbers only.";
      setIsSignUp(false);
    } else {
      document.getElementById('mobileError').innerText = "";
    }

    if (password.trim() === '') {
      document.getElementById('passwordError').innerText = "Password cannot be empty.";
      setIsSignUp(false);
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_]{6,50}$/.test(password)) {
      document.getElementById('passwordError').innerText = "Password must be alphanumeric, 6-50 characters long, and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
      setIsSignUp(false);
    } else {
      document.getElementById('passwordError').innerText = "";
    }

    if (confirmPassword.trim() === '') {
      document.getElementById('confirmPasswordError').innerText = "Confirm Password cannot be empty.";
      setIsSignUp(false);
    } else {
      document.getElementById('confirmPasswordError').innerText = "";
    }

    if (password !== confirmPassword) {
      document.getElementById('confirmPasswordError').innerText = "Passwords do not match.";
      setIsSignUp(false);
    }

    if (firstName.trim() !== '' && lastName.trim() !== '' && city.trim() !== '' && email.trim() !== '' && mobile.trim() !== '' && password === confirmPassword) {
      setIsSignUp(true);
      window.location.href = '/reg_config'; 
    }
  }

  function openGooglePopup() {
    var googleLoginWindow = window.open("https://www.google.com", "googleLoginWindow", "width=600,height=600");
  }

  return (
    <div className="container_sign_up">
      <h2>Sign Up</h2>
      <form id="signupForm" action='/' onSubmit={signUp}>
        <input type="text" id="firstName" placeholder="First Name" value={firstName} aria-label="First Name" onChange={(e) => setFirstName(e.target.value)} autoComplete='off' />
        <input type="text" id="lastName" placeholder="Last Name" value={lastName} aria-label="Last Name" onChange={(e) => setLastName(e.target.value)} autoComplete='off' />
        <div id="nameError" className="error_sign_up"></div>

        <input type="text" id="city" placeholder="City" value={city} aria-label="City" onChange={(e) => setCity(e.target.value)} autoComplete='off' />
        <div id="cityError" className="error_sign_up"></div>

        <input type="email" id="email" placeholder="Email" value={email} aria-label="Email" onChange={(e) => setEmail(e.target.value)} autoComplete='off' />
        <div id="emailError" className="error_sign_up"></div>

        <input type="tel" id="mobile" placeholder="Mobile Number (10 digits)" pattern="[0-9]{10}" value={mobile} aria-label="Mobile Number" onChange={(e) => setMobile(e.target.value)} autoComplete='off' />
        <div id="mobileError" className="error_sign_up"></div>

        <input type="password" id="password" placeholder="Create Password" value={password} aria-label="Create Password" onChange={(e) => setPassword(e.target.value)} autoComplete='off' />
        <div id="passwordError" className="error_sign_up"></div>

        <input type="password" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} aria-label="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} autoComplete='off' />
        <div id="confirmPasswordError" className="error_sign_up"></div>

        <input type="submit" value="Sign Up"/>

        <div className="action-links_sign_up">
           <p>Already registered?<Link to="/signin"> Sign In</Link></p>   <p><a href="#" onClick={openGooglePopup}>Login with Google</a></p>
        </div>
      </form>
    </div>
  );
}

export default SignUp; 
