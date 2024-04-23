import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "../../src/index.css";



const SignUp = () => {
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const[ConfirmPassword,setConfirmPassword]=useState('');
  const[email,setEmail]=useState('');
  const[mobile,setMobile]=useState('');
  const[isSignupSuccess,setIsSignUp]=useState(false);

  function signUp(event) {
    var username = document.getElementById('username').value.trim();
    var email = document.getElementById('email').value.trim();
    var mobile = document.getElementById('mobile').value.trim();
    var password = document.getElementById('password').value.trim();
    var confirmPassword = document.getElementById('confirmPassword').value.trim();
    
    event.preventDefault();
    //validation for empty field
    if (username === '') {
        document.getElementById('usernameError').innerText = "Username cannot be empty.";
        setIsSignUp(false);

    }

    if (email === '') {
        document.getElementById('emailError').innerText = "Email cannot be empty.";
        setIsSignUp(false);

    }

    if (mobile === '') {
        document.getElementById('mobileError').innerText = "Mobile number cannot be empty.";
        setIsSignUp(false);
    
    }

    if (password === '') {
        document.getElementById('passwordError').innerText = "Password cannot be empty.";
        setIsSignUp(false);

    }

    if (confirmPassword === '') {
        document.getElementById('confirmPasswordError').innerText = "Confirm Password cannot be empty.";
        setIsSignUp(false);
  
    }

    // Password validation
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_]{10,}$/;
    if (!passwordRegex.test(password)) {
        document.getElementById('passwordError').innerText = "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be 10 or more characters long.";
        setIsSignUp(false);
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').innerText = "Passwords do not match.";
        setIsSignUp(false);
    }
if(username !=="" && email !=="" && mobile !=="" && password=== confirmPassword){
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
        <input type="text" id="username" placeholder="Username" value={username} aria-label="Username" onChange={(e)=>setUsername(e.target.value)} />
        <div id="usernameError" className="error_sign_up"></div>

        <input type="email" id="email" placeholder="Email" value={email} aria-label="Email" onChange={(e)=>setEmail(e.target.value)}/>
        <div id="emailError" className="error_sign_up"></div>

        <input type="tel" id="mobile" placeholder="Mobile Number (10 digits)" pattern="[0-9]{10}" value={mobile} aria-label="Mobile Number" onChange={(e)=>setMobile(e.target.value)}/>
        <div id="mobileError" className="error_sign_up"></div>

        <input type="password" id="password" placeholder="Create Password"value={password} aria-label="Create Password" onChange={(e)=>setPassword(e.target.value)}/>
        <div id="passwordError" className="error_sign_up"></div>

        <input type="password" id="confirmPassword" placeholder="Confirm Password" value={ConfirmPassword} aria-label="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
        <div id="confirmPasswordError" className="error_sign_up"></div>

        <input type="submit" value="Sign Up"/>

        <div className="action-links_sign_up">
           <p>Already registered?<Link to="/signin"> Sign In</Link></p>   <p><a href="#" onClick={openGooglePopup}>Login with Google</a></p>
        </div>
    </form>
</div>

  )
}

export default SignUp;
