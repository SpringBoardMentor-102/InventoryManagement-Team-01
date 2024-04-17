function validateForm() {
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("email-error");
    emailError.textContent = "";
  
    if (email === "") {
      emailError.textContent = "Please enter your email address.";
      console.log("Email:", email);
      return false;
    }
  
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      return false;
    }
  
    const password = document.getElementById("password").value;
    const passwordError = document.getElementById("password-error");
    passwordError.textContent = "";
  
    const passwordStrengthRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordStrengthRegex.test(password)) {
      passwordError.textContent =
        "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and symbols.";
      return false;
    }
  
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[@$!%*?&]/.test(password); 
  
    if (password.length < minLength) {
      passwordError.textContent =
        "Password must be at least " + minLength + " characters long.";
      return false;
    }
  
    let missingChars = [];
    if (!hasUppercase) {
      missingChars.push("uppercase letter");
    }
    if (!hasLowercase) {
      missingChars.push("lowercase letter");
    }
    if (!hasNumber) {
      missingChars.push("number");
    }
    if (!hasSymbol) {
      missingChars.push("symbol");
    }
  
    if (missingChars.length > 0) {
      passwordError.textContent =
        "Password must contain " +
        (missingChars.length > 1 ? "and " : "") +
        missingChars.join(", ");
      return false;
    }
  
    const twoFaCode = document.getElementById("2fa-code").value;
    const twoFaError = document.getElementById("2fa-error");
    twoFaError.textContent = "";
  
    if (twoFaCode === "") {
      twoFaError.textContent = "Please enter the 2FA code from your email.";
      return false;
    }
  
    if (twoFaCode === "1234") {
      alert("Sign in successful!");
      window.location.href = "blank-page.html";
      return true;
    } else {
      alert("Incorrect code. Please try again.");
      return false; 
    }
  }
  
  const passwordSuggestion = document.createElement("p");
  passwordSuggestion.textContent =
    "For a stronger password, consider using a mix of uppercase and lowercase letters, numbers, and symbols.";
  passwordSuggestion.style.fontSize = "12px";
  passwordSuggestion.style.color = "#ccc";
  passwordSuggestion.style.marginTop = "5px";
  const passwordContainer = document.querySelector("form");
  passwordContainer.appendChild(passwordSuggestion);
  
  document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.getElementById('sign-in-form');
  
    signInForm.addEventListener('submit', function (event) {
      event.preventDefault(); 
      const isValid = validateForm(); 
      if (isValid) {
        signInForm.submit(); 
      }
    });
  });
  
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  themeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
  });
  