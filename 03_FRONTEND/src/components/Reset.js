import React from 'react'

const Reset = () => {

    function checkPassword(){
        let password=document.getElementById("new-password").value;
        let confirm_password=document.getElementById("confirm-password").value;
        let error=document.getElementById("new-password-error");
        let message=document.getElementById("confirm-password-error");
    
    
        if(password.length===0){
            error.textContent="**please enter password**"
                }else if(confirm_password.length===0){
                    message.textContent="**must be field**";
            }
    
                if(password.length !==0 && password.length<8){
                    error.textContent="Password must be at least 8 characters";
                }else if(password.length !==0){
            if(password !==confirm_password){
                message.textContent="**Password don't match**";
            }else if(password ===confirm_password){
                alert("reset successfully");
                window.location.href="blank.html";
            }
        }
    
    
    }
    

  return (
    <>

<div className="container">
    <h1>Reset Password</h1>
    <p>Please create a new password that you don't use on any other.</p>
    

    <form id="form" action="/">
        <div className="input-control">
            <label htmlFor="new-password">New Password</label>
            <input id="new-password" name="New Password" type="password"/>
            <div id="new-password-error"></div>
        </div>
        <div className="input-control">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input id="confirm-password"name="Confirm Password" type="password"/>
            <div id="confirm-password-error"></div>
        </div>
      
        <input className="submit-button" type="button" value="Submit"  onClick={checkPassword} />
      
    </form>
    
    
  </div>
    </>
  )
}

export default Reset