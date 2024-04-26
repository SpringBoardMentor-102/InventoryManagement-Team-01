import axios from "axios";
import React, { useState } from "react";

const Reset = () => {
  const [Password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  // let password=document.getElementById("new-password").value;
  // let confirm_password=document.getElementById("confirm-password").value;
  // let error=document.getElementById("new-password-error");
  // let message=document.getElementById("confirm-password-error");
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  console.log(token);
  const handleReset = async () => {
    if (Password === confirmPassword) {
      axios
        .post("http://localhost:5000/api/users/reset-password", {
          token: token,
          newPassword: Password,
        })
        .then((response) => {
          console.log(response.data);
          alert("Password reset successfully");
          // window.location.href = "blank.html";
        })
        .catch((error) => {
          console.error("Reset password error:", error);
          alert("Password reset failed. Please try again.");
        });
    }
  };

  // if(password.length===0){
  //     error.textContent="**please enter password**"
  //         }else if(confirm_password.length===0){
  //             message.textContent="**must be field**";
  //     }

  //         if(password.length !==0 && password.length<8){
  //             error.textContent="Password must be at least 8 characters";
  //         }else if(password.length !==0){
  //     if(password !==confirm_password){
  //         message.textContent="**Password don't match**";
  //     }else if(password ===confirm_password){
  //         alert("reset successfully");
  //         window.location.href="blank.html";
  //     }
  // }

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
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div id="new-password-error"></div>
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
            <div id="confirm-password-error"></div>
          </div>

          <input
            className="submit-button"
            type="button"
            value="Submit"
            onClick={handleReset}
          />
        </form>
      </div>
    </>
  );
};

export default Reset;
